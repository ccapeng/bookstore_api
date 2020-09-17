import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPublishers, deletePublisher } from '../../services/publisher';
import { setPublishers, setPublisherDeleted } from '../../actions/publisher';

const PublisherList = () => {

  const publishers = useSelector(state => {
    return state.publishers.publishers
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let data = await getPublishers();
      console.log("data", data);
      dispatch(setPublishers(data));
    }
    _fetch();
  }, []);

  const onDeletePublisher = (id) => {
    const _del = async () => {
      let result = await deletePublisher(id);
      if (result === "deleted") {
        dispatch(setPublisherDeleted(id));
      }
    }
    _del();
  }

  return (
    <>
      <section className="mt-5 d-flex align-items-center">
        <h1>Publishers</h1>
        <Link to="/publisher/add/" className="ml-auto">Add Publisher</Link>
      </section>
      <ul className="list-group mt-5">
        {publishers.map(publisher =>
          <li key={publisher.id} className="list-group-item d-flex">
            <Link to={`/publisher/${publisher.id}/`}>
              {publisher.name}
            </Link>
            <button
              className="btn btn-secondary ml-auto"
              onClick={() => onDeletePublisher(publisher.id)}
            >
              Delete
            </button>
          </li>
        )}
      </ul>
    </>
  )
};

export default PublisherList;