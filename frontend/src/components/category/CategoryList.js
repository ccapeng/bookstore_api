import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { getCategories, deleteCategory } from '../../services/category';
import { setCategories, setCategoryDeleted } from '../../actions/category';

const CategoryList = () => {

  const categories = useSelector(state => {
    return state.categories.categories
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let data = await getCategories();
      console.log("data categories", categories);
      dispatch(setCategories(data));
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
          {categories.map(category =>
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

// Category.propTypes = {
//   getCategories: PropTypes.func.isRequired,
//   categories: PropTypes.array.isRequired
// };

export default CategoryList;