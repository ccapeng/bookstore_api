import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookList, deleteBook } from '../../services/book';
import { setBookList, setBookDeleted } from '../../actions/book';

const BookList = () => {

  const bookList = useSelector(state => {
    return state.bookList.bookList
  });
  console.log("bookList", bookList);
  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let data = await getBookList();
      dispatch(setBookList(data));
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
          {bookList.map(book =>
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
                  onClick={() => { onDeleteBook(book.id) }}
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

export default BookList;