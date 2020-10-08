import { ACTIONS } from "../actions/types";

export const setAuthorList = (data) => {
  return {
    type: ACTIONS.SET_AUTHOR_LIST,
    payload: data
  }
}

export const setAuthorDeleted = (id) => {
  return {
    type: ACTIONS.SET_AUTHOR_DELETED,
    payload: id
  }
}

export const setAuthor = (data) => {
  return {
    type: ACTIONS.SET_AUTHOR,
    payload: data
  }
}

export const initAuthor = () => {
  return {
    type: ACTIONS.INIT_AUTHOR
  }
}

export const setAuthorValue = (key, data) => {
  return {
    type: ACTIONS.SET_AUTHOR_VALUE,
    payload: {
      [key]: data
    }
  }
}

export const setAuthorStatus = (status) => {
  return {
    type: ACTIONS.SET_AUTHOR_STATUS,
    payload: status
  }
}