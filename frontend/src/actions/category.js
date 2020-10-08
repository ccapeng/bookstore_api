import { ACTIONS } from "../actions/types";

export const setCategoryList = (data) => {
  return {
    type: ACTIONS.SET_CATEGORY_LIST,
    payload: data
  }
}

export const setCategoryDeleted = (id) => {
  return {
    type: ACTIONS.SET_CATEGORY_DELETED,
    payload: id
  }
}

export const setCategory = (data) => {
  return {
    type: ACTIONS.SET_CATEGORY,
    payload: data
  }
}

export const initCategory = () => {
  return {
    type: ACTIONS.INIT_CATEGORY
  }
}

export const setCategoryName = (data) => {
  return {
    type: ACTIONS.SET_CATEGORY_NAME,
    payload: data
  }
}

export const setCategoryStatus = (status) => {
  return {
    type: ACTIONS.SET_CATEGORY_STATUS,
    payload: status
  }
}