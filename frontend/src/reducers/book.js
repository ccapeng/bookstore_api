import { ACTIONS } from "../actions/types";

const initialBooksState = {
  books: []
}

export const books = (state = initialBooksState, action) => {
  switch (action.type) {
    case ACTIONS.SET_BOOKS:
      return {
        books: action.payload
      }
    case ACTIONS.SET_BOOK_DELETED:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload)
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

    // case ACTIONS.SET_BOOK_TITLE:
    //   return {
    //     ...state,
    //     book: {
    //       ...state.book,
    //       title: action.payload
    //     }
    //   };
    // case ACTIONS.SET_BOOK_CATEGORY:
    //   return {
    //     ...state,
    //     book: {
    //       ...state.book,
    //       category: action.payload
    //     }
    //   };
    // case ACTIONS.SET_BOOK_PUBLISHER:
    //   return {
    //     ...state,
    //     book: {
    //       ...state.book,
    //       publisher: action.payload
    //     }
    //   };
    // case ACTIONS.SET_BOOK_AUTHOR:
    //   return {
    //     ...state,
    //     book: {
    //       ...state.book,
    //       author: action.payload
    //     }
    //   };

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