import { combineReducers } from "redux";
import { categories, category } from "./category";
import { publishers, publisher } from "./publisher";
import { authors, author } from "./author";
import { books, book } from "./book";

export const rootReducer = combineReducers({
  categories,
  category,
  publishers,
  publisher,
  authors,
  author,
  books,
  book
})