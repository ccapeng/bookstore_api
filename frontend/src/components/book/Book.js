import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveBook, getBook } from '../../services/book';
import { setBook, initBook, setBookValue, setBookStatus } from '../../actions/book';
import { getCategories } from '../../services/category';
import { getPublishers } from '../../services/publisher';
import { getAuthors } from '../../services/author';
import { setCategories } from '../../actions/category';
import { setPublishers } from '../../actions/publisher';
import { setAuthors } from '../../actions/author';

const Book = props => {

  const [bookReady, setBookReady] = useState(false);
  const [categoryReady, setCategoryReady] = useState(false);
  const [publisherReady, setPublisherReady] = useState(false);
  const [authorReady, setAuthorReady] = useState(false);

  const { book, status } = useSelector(state => {
    return state.book
  });

  const categories = useSelector(state => {
    return state.categories.categories
  });
  const publishers = useSelector(state => {
    return state.publishers.publishers
  });
  const authors = useSelector(state => {
    return state.authors.authors
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let data = await getBook(bookId);
      dispatch(setBook(data));
      setBookReady(true);
    }
    let bookId = props.match.params.id;
    if (typeof (bookId) !== "undefined") {
      _fetch()
    } else {
      dispatch(initBook());
      setBookReady(true);
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
      let data = await getCategories();
      dispatch(setCategories(data));
      setCategoryReady(true);
    }
    _fetch()
  }, []);

  useEffect(() => {
    const _fetch = async () => {
      let data = await getPublishers();
      dispatch(setPublishers(data));
      setPublisherReady(true);
    }
    _fetch()
  }, []);

  useEffect(() => {
    const _fetch = async () => {
      let data = await getAuthors();
      dispatch(setAuthors(data));
      setAuthorReady(true);
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
      {(!bookReady || !categoryReady || !publisherReady || !authorReady) ?
        <div>Loading</div>
        :
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
                  {categories.map(category =>
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
                  {publishers.map(publisher =>
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
                  {authors.map(author =>
                    <option value={author.id} key={author.id}>
                      {author.last_name} {author.first_name}
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
      }
    </>
  )
};

export default Book;