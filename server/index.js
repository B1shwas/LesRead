//main import
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//file import
import connectDatabase from "./db/index.js";

//dotenv config
dotenv.config();

//db connection
connectDatabase();

//middlewares
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HEllo");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening at PORT ${process.env.PORT || 3000}`);
});
