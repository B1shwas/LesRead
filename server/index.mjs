//dotenv config
import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//main import
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//file import
import connectDatabase from "./db/index.js";

//db connection
connectDatabase();

//middlewares
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes import
import bookRoutes from "./routes/book.routes.js";
import userRoutes from "./routes/user.routes.js";
import { verifyJWT } from "./middlewares/auth.middlewares.js";

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

app.get("/home", verifyJWT, (req, res) => {
  res.json({ message: "Successfully Logged in" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening at PORT ${process.env.PORT || 3000}`);
});
