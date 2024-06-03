import { Router } from "express";
import { addBook, getBook } from "../controllers/book.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.get("/lists", getBook);

router.post("/add-book", upload("books").single("image"), addBook);

export default router;
