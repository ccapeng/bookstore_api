import { ACTIONS } from "../actions/types";

const initialAuthorsState = {
  authors: []
}

export const authors = (state = initialAuthorsState, action) => {
  switch (action.type) {
    case ACTIONS.SET_AUTHORS:
      return {
        authors: action.payload
      }
    case ACTIONS.SET_AUTHOR_DELETED:
      return {
        ...state,
        authors: state.authors.filter(author => author.id !== action.payload)
      }
    default:
      return state;
  }
}


const initialAuthorState = {
  author: {
    id: 0,
    lastName: "",
    firstName: ""
  },
  status: ""
}

export const author = (state = initialAuthorState, action) => {
  switch (action.type) {
    case ACTIONS.SET_AUTHOR:
      return {
        ...state,
        author: {
          id: action.payload.id,
          lastName: action.payload.last_name,
          firstName: action.payload.first_name
        }
      };
    case ACTIONS.INIT_AUTHOR:
      return {
        ...initialAuthorState
      };

    case ACTIONS.SET_AUTHOR_VALUE:
      return {
        ...state,
        author: {
          ...state.author,
          ...action.payload
        }
      };

    case ACTIONS.SET_AUTHOR_STATUS:
      if (action.payload === "saved") {
        return {
          ...initialAuthorState,
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