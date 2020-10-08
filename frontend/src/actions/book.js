import { ACTIONS } from "../actions/types";

export const setBookList = (data) => {
  return {
    type: ACTIONS.SET_BOOK_LIST,
    payload: data
  }
}

export const setBookDeleted = (id) => {
  return {
    type: ACTIONS.SET_BOOK_DELETED,
    payload: id
  }
}

export const setBook = (data) => {
  return {
    type: ACTIONS.SET_BOOK,
    payload: data
  }
}

export const setBookTitle = (data) => {
  return {
    type: ACTIONS.SET_BOOK_TITLE,
    payload: data
  }
}

export const initBook = () => {
  return {
    type: ACTIONS.INIT_BOOK
  }
}

export const setBookValue = (key, data) => {
  return {
    type: ACTIONS.SET_BOOK_VALUE,
    payload: {
      [key]: data
    }
  }
}

export const setBookStatus = (status) => {
  return {
    type: ACTIONS.SET_BOOK_STATUS,
    payload: status
  }
}