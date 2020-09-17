import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { savePublisher, getPublisher } from '../../services/publisher';
import { setPublisher, initPublisher, setPublisherName, setPublisherStatus } from '../../actions/publisher';


const Publisher = props => {

  const { publisher, status } = useSelector(state => {
    return state.publisher
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let data = await getPublisher(publisherId);
      dispatch(setPublisher(data));
    }
    let publisherId = props.match.params.id;
    if (typeof (publisherId) !== "undefined") {
      _fetch()
    }
  }, []);

  useEffect(() => { //unmount
    return () => {
      dispatch(initPublisher());
    }
  }, []);

  const onChangeName = (value) => {
    dispatch(setPublisherName(value));
  }

  const save = () => {
    const _save = async () => {
      let result = await savePublisher(publisher);
      dispatch(setPublisher(result));
      dispatch(setPublisherStatus("saved"));
    }
    if (status === "") {
      dispatch(setPublisherStatus("submitting"));
      _save();
    }
  }

  if (status === "saved") {
    return (<Redirect to="/publishers"></Redirect>);
  }

  return (
    <>
      <section className="mt-5 d-flex adjust-items-center">
        <h1>Publisher Editor</h1>
        <Link to="/publishers" className="ml-auto">Publishers</Link>
      </section>
      <section className="mt-3">
        <form onSubmit={(event) => { event.preventDefault(); save() }}>
          <div className="form-group">
            <label>Publisher Name</label>
            <input
              type="text"
              name="publisher"
              className="form-control"
              onChange={(event) => { onChangeName(event.target.value) }}
              value={publisher.name}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input type="hidden" name="publisherId" value={publisher.id} />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )

};

export default Publisher;