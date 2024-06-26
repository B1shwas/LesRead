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
const allowedOrigins = [
  "http://localhost:5173",
  "https://lesread.netlify.app",
  "https://les-read-3q2q.vercel.app",
];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader(
    "Content-Type",
    "application/json",
    "access-control-allow-credentials"
  );
  next();
});

//Routes import
import bookRoutes from "./routes/book.routes.js";
import userRoutes from "./routes/user.routes.js";
import { verifyJWT } from "./middlewares/auth.middlewares.js";

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

app.get("/home", verifyJWT, (_, res) => {
  res.json({ message: "Successfully Logged in" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening at PORT ${process.env.PORT || 3000}`);
});
