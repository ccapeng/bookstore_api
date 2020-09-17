import axios from "axios";

function getConfig() {
  return {
    headers: {
      "Content-Type": "application/json"
    },
  };
}

export const getBooks = async () => {

  try {
    let result = await axios.get("api/book/get_all/", getConfig());
    return Promise.resolve(result.data);
  } catch (error) {
    console.log(error);
    return Promise.reject("get error");
  }

}

export const getBook = async (bookId, callback) => {

  try {
    let result = await axios.get(`api/book/${bookId}/`, getConfig());
    return Promise.resolve(result.data);
  } catch (error) {
    console.log(error);
    return Promise.reject("get error");
  }

}

export const saveBook = async (book) => {
  if (book.category === 0) {
    book.category = "";
  }
  if (book.publisher === 0) {
    book.publisher = "";
  }
  if (book.author === 0) {
    book.author = "";
  }
  if (book.id === 0) {

    try {
      let body = JSON.stringify(book);
      let result = await axios.post("api/book/", body, getConfig());
      if (result.status === 201) {
        return Promise.resolve(result.data);
      } else {
        return Promise.reject(result.data);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject("save error");
    }

  } else {

    try {
      let body = JSON.stringify(book);
      let result = await axios.patch(`api/book/${book.id}/`, body, getConfig());
      if (result.status === 200) {
        return Promise.resolve(result.data);
      } else {
        return Promise.reject(result.data);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject("save error");
    }

  }

}

export const deleteBook = async (bookId) => {

  try {
    let result = await axios.delete(url, getConfig());
    if (result.status === 204) {
      return Promise.resolve("deleted");
    } else {
      return Promise.reject("failed");
    }
  } catch (error) {
    console.log(error);
    return Promise.reject("Delete Error");
  }

}