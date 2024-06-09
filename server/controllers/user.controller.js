import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

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

export { registerUser, loginUser };
