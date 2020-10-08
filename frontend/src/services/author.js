import Request from "./request";

export const getAuthorList = () => {

  let url = "api/author/";
  return Request.get(url);

}

export const getAuthor = (authorId) => {

  let url = `api/author/${authorId}/`;
  return Request.get(url);

}

export const saveAuthor = (author) => {

  if (author.id === 0) {
    const body = JSON.stringify({
      lastName: author.lastName,
      firstName: author.firstName,
    });
    let url = "api/author/";
    return Request.create(url, body);

  } else {

    const body = JSON.stringify(author);
    let url = `api/author/${author.id}/`;
    return Request.update(url, body);

  }

}

export const deleteAuthor = (authorId) => {

  let url = `api/author/${authorId}/`;
  return Request.delete(url);

}