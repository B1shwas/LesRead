import UserDetails from "../models/user-details.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/Cloudinary.js";

const getCurrentUser = AsyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(400, "User not found");

  const currentUser = await User.findById(req.user._id)
    .select("-password -refreshToken")
    .populate("details");
  if (!currentUser) throw new ApiError(500, "Something went wrong");

  return res.status(200).json(new ApiResponse(200, currentUser, "Success"));
});

const registerUser = AsyncHandler(async (req, res) => {
  const { fullName, email, password, userName } = req.body;

  if (
    [fullName, email, password, userName].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) throw new ApiError(400, "User already exists ");

  const user = await User.create({
    fullName,
    email,
    password,
    userName,
  });

  const createdUser = await User.findById(user._id);
  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering user");

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const generateRefreshAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};
const loginUser = AsyncHandler(async (req, res) => {
  const { userName, password, email } = req.body;

  if (!(userName || email))
    throw new ApiError(400, "Username or email is required");

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) throw new ApiError(400, "User not found ");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

  const { refreshToken, accessToken } = await generateRefreshAndAccessToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .cookie("access-token", accessToken, options)
    .cookie("refresh-token", refreshToken, options)
    .json(
      new ApiResponse(
        400,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const refreshAccessToken = AsyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.SECRET_KEY
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    };

    const { accessToken, newRefreshToken } =
      await generateRefreshAndAccessToken(user._id);

    return res
      .status(200)
      .cookie("access-token", accessToken, options)
      .cookie("refresh-token", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});
const logoutUser = AsyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const editUserDetails = AsyncHandler(async (req, res) => {
  const { gender, bio, dob, address, fullName, email } = req.body;
  const userId = req.user._id;
  console.log(userId);

  const existingUser = await User.findById(userId).populate("details");

  if (!existingUser) throw new ApiError(404, "User not found");

  if (existingUser.details) {
    const updatedUserDetails = await UserDetails.findByIdAndUpdate(
      existingUser.details._id,
      {
        gender: gender || existingUser.details.gender,
        bio: bio || existingUser.details.bio,
        dob: dob || existingUser.details.dob,
        address: address || existingUser.details.address,
      },
      { new: true }
    );
    existingUser.details = updatedUserDetails;
    existingUser.fullName = fullName || existingUser.fullName;
    existingUser.email = email || existingUser.email;

    await existingUser.save({ validateModifiedOnly: true });

    return res
      .status(200)
      .json(new ApiResponse(200, existingUser, "Userdetails updated"));
  } else {
    const newUserDetails = await UserDetails.create({
      gender: gender || null,
      bio: bio || null,
      dob: dob || null,
      address: address || null,
    });
    existingUser.details = newUserDetails;
    existingUser.fullName = fullName || existingUser.fullName;
    existingUser.email = email || existingUser.email;

    await existingUser.save({ validateModifiedOnly: true });

    return res
      .status(200)
      .json(new ApiResponse(200, existingUser, "Userdetails updated"));
  }
});

const changePassword = AsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req?.user._id);

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) throw new ApiError(400, "Invalid old password");

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const updateProfileImage = AsyncHandler(async (req, res) => {
  const imagePath = req.file && req.file.path;
  const userId = req.user._id;

  if (!userId) throw new ApiError(404, "User not found");

  if (!imagePath) throw new ApiError(400, "Image file is required");

  const user = await User.findById(userId);

  if (
    user.profileImage &&
    user.profileImage !==
      "https://winkeyecare.com/wp-content/uploads/2013/03/Empty-Profile-Picture-450x450.jpg"
  ) {
    const imageId = user.profileImage.split("/").pop().split(".")[0];

    await deleteFromCloudinary(imageId, "LesRead/users");
  }

  const image = await uploadOnCloudinary(imagePath, "LesRead/users");

  user.profileImage = image.secure_url;
  user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Profile Image Changed Successfully"));
});

export {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getCurrentUser,
  editUserDetails,
  changePassword,
  updateProfileImage,
};
