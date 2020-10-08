import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryList, deleteCategory } from '../../services/category';
import { setCategoryList, setCategoryDeleted } from '../../actions/category';

const CategoryList = () => {

  const categoryList = useSelector(state => {
    return state.categoryList.categoryList
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let data = await getCategoryList();
      console.log("data", data);
      dispatch(setCategoryList(data));
    }
    _fetch();
  }, []);

  const onDeleteCategory = (id) => {
    const _del = async () => {
      let result = await deleteCategory(id);
      if (result === "deleted") {
        dispatch(setCategoryDeleted(id));
      }
    }
    _del();
  }

  return (
    <div>
      <section className="mt-5 d-flex align-items-center">
        <h1>Categories</h1>
        <Link to="/category/add/" className="ml-auto">Add Category</Link>
      </section>
      <section>
        <ul className="list-group mt-3">
          {categoryList.map(category =>
            <li key={category.id} className="list-group-item d-flex">
              <div>
                <Link to={`/category/${category.id}/`}>{category.name}</Link>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => { onDeleteCategory(category.id) }}
                >
                  Delete
                  </button>
              </div>
            </li>
          )}
        </ul>
      </section>
    </div >
  )
};

export default CategoryList;