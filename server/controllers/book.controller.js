import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import Book from "../models/book.model.js";

const validateBookData = (title, author, price, cutPrice, stock) => {
  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  if (!author) {
    throw new ApiError(400, "Author is required");
  }

  if (!price || price < 0) {
    throw new ApiError(400, "Price must be a non-negative number");
  }

  if (cutPrice < 0 || cutPrice >= price) {
    throw new ApiError(
      400,
      "Cut price must be a non-negative number and less than the regular price"
    );
  }

  if (!stock || stock < 0) {
    throw new ApiError(400, "Stock must be a non-negative number");
  }
};

const addBook = AsyncHandler(async (req, res) => {
  const {
    title,
    author,
    price,
    cutPrice,
    stock,
    hype,
    genre,
    description,
    publishedAt,
    rating,
    discount,
  } = req.body;

  validateBookData(title, author, price, cutPrice, stock);

  const existingBook = await Book.findOne({
    title: { $regex: new RegExp(`^${title}$`, "i") },
    author: { $regex: new RegExp(`^${author}$`, "i") },
  });
  if (existingBook) {
    throw new ApiError(
      400,
      "A book with the same title and author already exists"
    );
  }

  const imagePath = req.file && req.file.path;
  if (!imagePath) throw new ApiError(400, "Image file is required");

  const image = await uploadOnCloudinary(imagePath, "LesRead");

  if (!image) throw new ApiError(400, "Image file is required from Cloudinary");

  const book = await Book.create({
    title,
    author,
    price,
    cutPrice,
    stock,
    hype,
    genre,
    image: image.secure_url,
    description,
    discount,
    rating,
    genre,
    publishedAt,
  });

  if (!book) throw new ApiError(500, "Something went wrong ");

  return res
    .status(201)
    .json(new ApiResponse(200, book, "Book added successfully"));
});

const getBook = AsyncHandler(async (req, res) => {
  const book = await Book.find();
  if (!book) throw new ApiError(500, "Something went wrong");
  return res.status(200).json(new ApiResponse(200, book, "Book fetched"));
});

export { addBook, getBook };
