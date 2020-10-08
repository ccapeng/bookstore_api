import { ACTIONS } from "../actions/types";

const initialBookListState = {
  bookList: []
}

export const bookList = (state = initialBookListState, action) => {
  switch (action.type) {
    case ACTIONS.SET_BOOK_LIST:
      return {
        bookList: action.payload.sort(
          function (a, b) { return a.title.toLowerCase() > b.title.toLowerCase() }
        )
      }
    case ACTIONS.SET_BOOK_DELETED:
      return {
        ...state,
        bookList: state.bookList.filter(book => book.id !== action.payload)
      }
    default:
      return state;
  }
}


const initialBookState = {
  book: {
    id: 0,
    title: "",
    category: 0,
    book: 0,
    author: 0
  },
  status: ""
}

export const book = (state = initialBookState, action) => {
  switch (action.type) {
    case ACTIONS.SET_BOOK:
      let book = action.payload;
      if (book.category === null) {
        book.category = 0;
      }
      if (book.publisher === null) {
        book.publisher = 0;
      }
      if (book.author === null) {
        book.author = 0;
      }
      return {
        ...state,
        book: book
      };
    case ACTIONS.INIT_BOOK:
      return {
        ...initialBookState
      };

    case ACTIONS.SET_BOOK_VALUE:
      return {
        ...state,
        book: {
          ...state.book,
          ...action.payload
        }
      };

    case ACTIONS.SET_BOOK:
      return {
        ...state,
        book: action.payload
      };
    case ACTIONS.SET_BOOK_STATUS:
      if (action.payload === "saved") {
        return {
          ...initialBookState,
          status: action.payload
        };
      } else {
        return {
          ...state,
          status: action.payload
        };
      }

    default:
      return state;
  }
}