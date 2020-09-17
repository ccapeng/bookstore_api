import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import PropTypes from 'prop-types';
import { saveAuthor, getAuthor } from '../../services/author';
//import { setAuthor, initAuthor, setAuthorLastName, setAuthorFirstName, setAuthorStatus } from '../../actions/author';
import { setAuthor, setAuthorValue, initAuthor, setAuthorStatus } from '../../actions/author';

const Author = props => {

  const { author, status } = useSelector(state => {
    return state.author
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let data = await getAuthor(authorId);
      dispatch(setAuthor(data));
    }
    let authorId = props.match.params.id;
    if (typeof (authorId) !== "undefined") {
      _fetch()
    }
  }, []);

  useEffect(() => { //unmount
    return () => {
      dispatch(initAuthor());
    }
  }, []);

  const onChangeAuthor = (key, value) => {
    dispatch(setAuthorValue(key, value));
  }

  const save = () => {
    const _save = async () => {
      try {
        let result = await saveAuthor(author);
        dispatch(setAuthor(result));
        dispatch(setAuthorStatus("saved"));
      } catch (error) {
        console.log("save error", error);
      }
    }
    if (status === "") {
      dispatch(setAuthorStatus("submitting"));
      _save();
    }
  }

  if (status === "saved") {
    return (<Redirect to="/authors" />);
  }

  return (
    <>
      <h1>Author Editor</h1>
      <section className="mt-5">
        <Link to="/authors">Authors</Link>
      </section>
      <section className="mt-3">
        <form onSubmit={(event) => { event.preventDefault(); save() }}>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              onChange={(event) => { onChangeAuthor(event.target.name, event.target.value) }}
              value={author.lastName}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              onChange={(event) => { onChangeAuthor(event.target.name, event.target.value) }}
              value={author.firstName}
            />
          </div>
          <div className="form-group">
            <input type="hidden" name="authorId" value={author.id} />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
};

// AuthorEditor.propTypes = {
//   getCategories: PropTypes.func.isRequired,
//   categories: PropTypes.array.isRequired
// };

export default Author;