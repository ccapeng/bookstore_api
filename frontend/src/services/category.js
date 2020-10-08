import Request from "./request";

export const getCategoryList = () => {

  let url = "api/category/";
  return Request.get(url);

}

export const getCategory = (categoryId) => {

  let url = `api/category/${categoryId}/`;
  return Request.get(url);

}

export const saveCategory = (category) => {

  if (category.id === 0) {
    const body = JSON.stringify({ name: category.name });
    let url = "api/category/";
    return Request.create(url, body);
  } else {
    const body = JSON.stringify(category);
    let url = `api/category/${category.id}/`;
    return Request.update(url, body);
  }

}

export const deleteCategory = (categoryId) => {

  let url = `api/category/${categoryId}/`;
  return Request.delete(url);

}