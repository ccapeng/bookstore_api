import Request from "./request";

export const getBookList = () => {

  let url = "api/book/";
  return Request.get(url);

}

export const getBook = (bookId) => {

  let url = `api/book/${bookId}/`;
  return Request.get(url);

}

export const saveBook = (book) => {
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
    book.id = "";
    const body = JSON.stringify(book);
    let url = "api/book/";
    return Request.create(url, body);
  } else {
    const body = JSON.stringify(book);
    let url = `api/book/${book.id}/`;
    return Request.update(url, body);
  }

}

export const deleteBook = (bookId) => {

  let url = `api/book/${bookId}/`;
  return Request.delete(url);

}