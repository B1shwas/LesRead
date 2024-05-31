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
    stock: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    hype: {
      type: String,
      enum: ["Best Seller", "Trending", "New Release"],
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
  },
  { timestamps: true }
);

const Book = new model("book", BookSchema);

export default Book;
