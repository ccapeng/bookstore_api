import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveCategory, getCategory } from '../../services/category';
import { setCategory, initCategory, setCategoryName, setCategoryStatus } from '../../actions/category';

const Category = props => {

  const { category, status } = useSelector(state => {
    return state.category
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategory = async () => {
      let data = await getCategory(categoryId);
      dispatch(setCategory(data));
    }
    let categoryId = props.match.params.id;
    if (typeof (categoryId) !== "undefined") {
      fetchCategory();
    }
  }, []);

  useEffect(() => { //unmount
    return () => {
      dispatch(initCategory());
    }
  }, []);

  const onChangeName = (value) => {
    dispatch(setCategoryName(value));
  }

  const save = () => {
    const _save = async () => {
      let result = await saveCategory(category);
      dispatch(setCategory(result));
      dispatch(setCategoryStatus("saved"));
    }
    if (status === "") {
      dispatch(setCategoryStatus("submitting"));
      _save();
    }
  }

  if (status === "saved") {
    return (<Redirect to="/categories" />);
  }

  return (
    <>
      <section className="mt-5 d-flex align-items-center">
        <h1>Category Editor</h1>
        <Link to="/categories" className="ml-auto">Categories</Link>
      </section>
      <section className="mt-3">
        <form onSubmit={(event) => { event.preventDefault(); save() }}>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              name="category"
              className="form-control"
              onChange={(event) => { onChangeName(event.target.value) }}
              value={category.name}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input type="hidden" name="categoryId" value={category.id} />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
};

export default Category;