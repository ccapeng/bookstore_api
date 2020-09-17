import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from "react-redux";
import { getBooks, deleteBook } from '../../services/book';
import { setBooks, setBookDeleted } from '../../actions/book';

const BookList = () => {

  const books = useSelector(state => {
    return state.books.books
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let data = await getBooks();
      dispatch(setBooks(data));
    }
    _fetch();
  }, []);

  const onDeleteBook = (id) => {
    const _del = async () => {
      let result = await deleteBook(id);
      if (result === "deleted") {
        dispatch(setBookDeleted(id));
      }
    }
    _del();
  }

  return (
    <div>
      <div className="d-flex">
        <h1>Books</h1>
        <Link to="/book/add/" className="ml-auto">Add Book</Link>
      </div>
      <table className="table table-bordered mt-5">
        <thead>
          <tr>
            <th>Book</th>
            <th>Category</th>
            <th>Publisher</th>
            <th>Author</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map(book =>
            <tr key={book.id}>
              <td>
                <Link to={`/book/${book.id}/`}>{book.title}</Link>
              </td>
              <td>
                {book.category}
              </td>
              <td>
                {book.publisher}
              </td>
              <td>
                {book.author}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => { onDeleteBook(book.id, resetBooks) }}
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
};

// Book.propTypes = {
//   getBooks: PropTypes.func.isRequired,
//   books: PropTypes.array.isRequired
// };

export default BookList;