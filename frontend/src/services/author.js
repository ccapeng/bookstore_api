import axios from "axios";

function getConfig() {
  return {
    headers: {
      "Content-Type": "application/json"
    },
  };
}

export const getAuthors = async () => {

  try {
    let result = await axios.get("api/author/", getConfig());
    return Promise.resolve(result.data);
  } catch (error) {
    console.log(error);
    return Promise.reject("get error");
  }

}

export const getAuthor = async (authorId) => {

  try {
    let result = await axios.get(`api/author/${authorId}/`, getConfig());
    return Promise.resolve(result.data);
  } catch (error) {
    console.log(error);
    return Promise.reject("get error");
  }

}

export const saveAuthor = async (author) => {

  if (author.id === 0) {
    const body = JSON.stringify({
      last_name: author.lastName,
      first_name: author.firstName
    });

    try {
      let result = await axios.post("api/author/", body, getConfig());
      console.log("result state", result.status)
      if (result.status === 201) {
        return Promise.resolve(result.data);
      } else {
        return Promise.reject(result.data);
      }
    } catch (error) {
      console.log("error", error);
      return Promise.reject("save error");
    }

  } else {

    const body = JSON.stringify({
      id: author.id,
      last_name: author.lastName,
      first_name: author.firstName
    });
    try {
      let result = await axios.patch(`api/author/${author.id}/`, body, getConfig());
      if (result.status === 200) {
        return Promise.resolve(result.data);
      } else {
        return Promise.reject(result.data);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject("Save Error");
    }

  }

}

export const deleteAuthor = async (authorId) => {

  try {
    let result = await axios.delete(`api/author/${authorId}/`, getConfig());
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