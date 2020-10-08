import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveBook, getBook } from '../../services/book';
import { setBook, initBook, setBookValue, setBookStatus } from '../../actions/book';
import { getCategoryList } from '../../services/category';
import { getPublisherList } from '../../services/publisher';
import { getAuthorList } from '../../services/author';
import { setCategoryList } from '../../actions/category';
import { setPublisherList } from '../../actions/publisher';
import { setAuthorList } from '../../actions/author';

const Book = props => {

  const { book, status } = useSelector(state => {
    return state.book
  });

  const categoryList = useSelector(state => {
    return state.categoryList.categoryList
  });
  const publisherList = useSelector(state => {
    return state.publisherList.publisherList
  });
  const authorList = useSelector(state => {
    return state.authorList.authorList
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let data = await getBook(bookId);
      dispatch(setBook(data));
    }
    let bookId = props.match.params.id;
    if (typeof (bookId) !== "undefined") {
      _fetch()
    } else {
      dispatch(initBook());
    }
  }, []);

  const onChangeBook = (key, value) => {
    dispatch(setBookValue(key, value));
  }

  const save = () => {
    const _save = async () => {
      try {
        let result = await saveBook(book);
        dispatch(setBook(result));
        dispatch(setBookStatus("saved"));
      } catch (error) {
        console.log("save error", error);
      }
    }
    if (status === "") {
      dispatch(setBookStatus("submitting"));
      _save();
    }
  }

  useEffect(() => {
    const _fetch = async () => {
      let data = await getCategoryList();
      dispatch(setCategoryList(data));
    }
    _fetch()
  }, []);

  useEffect(() => {
    const _fetch = async () => {
      let data = await getPublisherList();
      dispatch(setPublisherList(data));
    }
    _fetch()
  }, []);

  useEffect(() => {
    const _fetch = async () => {
      let data = await getAuthorList();
      dispatch(setAuthorList(data));
    }
    _fetch()
  }, []);

  useEffect(() => { //unmount
    return () => {
      dispatch(initBook());
    }
  }, []);

  if (status === "saved") {
    return (<Redirect to="/books" />);
  }

  return (
    <>
      <div className="d-flex">
        <h1>Book Editor</h1>
        <Link to="/books/" className="ml-auto">Books</Link>
      </div>
      <section className="mt-3">
        <form onSubmit={(event) => { event.preventDefault(); save() }}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              onChange={event => onChangeBook(event.target.name, event.target.value)}
              value={book.title}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              className="form-control"
              onChange={event => onChangeBook(event.target.name, event.target.value)}
              value={book.category}
            >
              <option value="0"> --- </option>
              {categoryList.map(category =>
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Publisher</label>
            <select
              name="publisher"
              className="form-control"
              onChange={event => onChangeBook(event.target.name, event.target.value)}
              value={book.publisher}
            >
              <option value="0"> --- </option>
              {publisherList.map(publisher =>
                <option value={publisher.id} key={publisher.id}>
                  {publisher.name}
                </option>
              )}
            </select>
          </div>
          <div className="form-group">
            <label>Author</label>
            <select
              name="author"
              className="form-control"
              value={book.author}
              onChange={event => onChangeBook(event.target.name, event.target.value)}
            >
              <option value="0"> --- </option>
              {authorList.map(author =>
                <option value={author.id} key={author.id}>
                  {author.lastName} {author.firstName}
                </option>
              )}
            </select>
          </div>
          <div className="form-group">
            <input type="hidden" name="bookId" value={book.id} />
            <button className="btn btn-primary" type="submit">
              Submit
                </button>
          </div>
        </form>
      </section>
    </>
  )
};

export default Book;