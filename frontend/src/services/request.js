import axios from "axios";

const getHeaderConfig = () => {
  return {
    headers: {
      "Content-Type": "application/json"
    }
  };
}

const getFullURL = (url) => {
  return `http://127.0.0.1:8000/${url}`;
}


const Request = {

  get: async (url) => {

    try {
      let result = await axios.get(
        getFullURL(url),
        getHeaderConfig()
      );
      return Promise.resolve(result.data);
    } catch (error) {
      console.log(error);
      return Promise.reject("get error");
    }

  },

  create: async (url, body) => {

    try {
      let result = await axios.post(getFullURL(url), body, getHeaderConfig());
      if (result.status === 201) {
        return Promise.resolve(result.data);
      } else {
        return Promise.reject(result.data);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject("save error");
    }

  },

  update: async (url, body) => {

    try {
      let result = await axios.patch(getFullURL(url), body, getHeaderConfig());
      if (result.status === 200) {
        return Promise.resolve(result.data);
      } else {
        return Promise.reject(result.data);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject("Save Error");
    }

  },

  delete: async (url) => {

    try {
      let result = await axios.delete(getFullURL(url), getHeaderConfig());
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
}

export default Request;