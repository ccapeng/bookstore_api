import { ACTIONS } from "../actions/types";

const initialCategoriesState = {
  categories: []
}

export const categories = (state = initialCategoriesState, action) => {
  switch (action.type) {
    case ACTIONS.SET_CATEGORIES:
      return {
        categories: action.payload
      }
    case ACTIONS.SET_CATEGORY_DELETED:
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload)
      }
    default:
      return state;
  }
}


const initialCategoryState = {
  category: {
    id: 0,
    name: ""
  },
  status: ""
}

export const category = (state = initialCategoryState, action) => {
  switch (action.type) {
    case ACTIONS.SET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case ACTIONS.SET_CATEGORY_NAME:
      return {
        ...state,
        category: {
          ...state.category,
          name: action.payload
        }
      };
    case ACTIONS.SET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case ACTIONS.INIT_CATEGORY:
      return {
        ...initialCategoryState
      };
    case ACTIONS.SET_CATEGORY_STATUS:
      if (action.payload === "saved") {
        return {
          ...initialCategoryState,
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