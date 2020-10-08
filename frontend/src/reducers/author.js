import { ACTIONS } from "../actions/types";

const initialAuthorListState = {
  authorList: []
}

export const authorList = (state = initialAuthorListState, action) => {
  switch (action.type) {
    case ACTIONS.SET_AUTHOR_LIST:
      return {
        authorList: action.payload.sort(
          function (a, b) { return a.lastName.toLowerCase() > b.lastName.toLowerCase() }
        )
      }
    case ACTIONS.SET_AUTHOR_DELETED:
      return {
        ...state,
        authorList: state.authorList.filter(author => author.id !== action.payload)
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
          lastName: action.payload.lastName,
          firstName: action.payload.firstName
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