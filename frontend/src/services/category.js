import axios from "axios";

function getConfig() {
  return {
    headers: {
      "Content-Type": "application/json"
    },
  };
}

export const getCategories = async () => {

  try {
    let result = await axios.get("api/category/", getConfig());
    return Promise.resolve(result.data);
  } catch (error) {
    console.log(error);
    return Promise.reject("get error");
  }

}

export const getCategory = async (categoryId) => {

  try {
    let result = await axios.get(`api/category/${categoryId}/`, getConfig());
    return Promise.resolve(result.data);
  } catch (error) {
    console.log(error);
    return Promise.reject("get error");
  }

}

export const saveCategory = async (category) => {

  if (category.id === 0) {
    const body = JSON.stringify({ name: category.name });

    try {
      let result = await axios.post("api/category/", body, getConfig());
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

    const body = JSON.stringify(category);
    try {
      let result = await axios.patch(`api/category/${category.id}/`, body, getConfig());
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

export const deleteCategory = async (categoryId) => {

  try {
    let result = await axios.delete(`api/category/${categoryId}/`, getConfig());
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