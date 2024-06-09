import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    profileImage: {
      type: String,
      default:
        "https://www.kindpng.com/picc/m/150-1503922_user-png-grey-transparent-png.png",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    purchasedBook: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    cart: [
      {
        book: [
          {
            type: Schema.Types.ObjectId,
            ref: "Book",
          },
        ],
        quantity: { type: Number, default: 0 },
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

const User = model("User", userSchema);

export default User;
