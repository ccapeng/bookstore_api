import { ACTIONS } from "../actions/types";

const initialPublisherListState = {
  publisherList: []
}

export const publisherList = (state = initialPublisherListState, action) => {
  switch (action.type) {
    case ACTIONS.SET_PUBLISHER_LIST:
      return {
        publisherList: action.payload.sort(
          function (a, b) { return a.name.toLowerCase() > b.name.toLowerCase() }
        )
      }
    case ACTIONS.SET_PUBLISHER_DELETED:
      return {
        ...state,
        publisherList: state.publisherList.filter(publisher => publisher.id !== action.payload)
      }
    default:
      return state;
  }
}


const initialPublisherState = {
  publisher: {
    id: 0,
    name: ""
  },
  status: ""
}

export const publisher = (state = initialPublisherState, action) => {
  switch (action.type) {
    case ACTIONS.GET_PUBLISHER:
      return {
        ...state,
        publisher: action.payload
      };
    case ACTIONS.SET_PUBLISHER_NAME:
      return {
        ...state,
        publisher: {
          ...state.publisher,
          name: action.payload
        }
      };
    case ACTIONS.SET_PUBLISHER:
      return {
        ...state,
        publisher: action.payload
      };
    case ACTIONS.INIT_PUBLISHER:
      return {
        ...initialPublisherState
      };
    case ACTIONS.SET_PUBLISHER_STATUS:
      if (action.payload === "saved") {
        return {
          ...initialPublisherState,
          status: action.payload
        };
      } else {
        return {
          ...state,
          status: action.payload
        };
      }

    default:
      return state;
  }
}