import { Schema, model } from "mongoose";

const BookSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cutPrice: {
      type: Number,
    },
    stock: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    hype: {
      type: String,
      enum: ["Best Seller", "Trending", "New Release"],
    },
    rating:{
      type: Number
    },
    discount: {
      type: String
    },
    genre: {
      type: String,
      enum: [
        "Fantasy",
        "Sci-Fi",
        "Romance",
        "Mystery",
        "Thriller",
        "Historical Fiction",
        "Literary Fiction",
        "Young Adult",
        "Children's Fiction",
        "Biography/Autobiography",
        "History",
        "Science",
        "Self-Help",
        "Memoir",
        "Travel",
        "True Crime",
        "Business/Finance",
        "Cookbooks",
      ],
    },
    description: {
      type: String,
    },
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Book = new model("book", BookSchema);

export default Book;
