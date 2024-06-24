import { Schema, model } from "mongoose";

const userDetailSchema = new Schema({
  bio: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  dob: {
    type: Date,
  },
  address: {
    type: String,
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
});

const UserDetails = model("UserDetails", userDetailSchema);

export default UserDetails;
