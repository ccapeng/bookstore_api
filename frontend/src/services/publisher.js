import axios from "axios";

function getConfig() {
  return {
    headers: {
      "Content-Type": "application/json"
    },
  };
}

export const getPublishers = async () => {

  try {
    let result = await axios.get("api/publisher/", getConfig());
    return Promise.resolve(result.data);
  } catch (error) {
    console.log(error);
    return Promise.reject("get error");
  }

}

export const getPublisher = async (publisherId) => {

  try {
    let result = await axios.get(`api/publisher/${publisherId}/`, getConfig());
    return Promise.resolve(result.data);
  } catch (error) {
    console.log(error);
    return Promise.reject("get error");
  }

}

export const savePublisher = async (publisher) => {

  if (publisher.id === 0) {
    const body = JSON.stringify({ name: publisher.name });

    try {
      let result = await axios.post("api/publisher/", body, getConfig());
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

    const body = JSON.stringify(publisher);
    try {
      let result = await axios.patch(`api/publisher/${publisher.id}/`, body, getConfig());
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

export const deletePublisher = async (publisherId) => {

  try {
    let result = await axios.delete(`api/publisher/${publisherId}/`, getConfig());
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