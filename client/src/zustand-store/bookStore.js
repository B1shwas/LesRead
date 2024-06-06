import { create } from "zustand";
import { getAllBooks } from "../utils/getApi";

export const useBookStore = create((set) => ({
  books: [],
  fetchBook: async () => {
    await getAllBooks().then((res) =>
      set({
        books: res?.data?.data,
      })
    );
  },
}));
