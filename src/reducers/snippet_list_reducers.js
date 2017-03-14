// https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3#.kcdd1ivn5

import * as actionTypes from '../constants/actionTypes';

const INITIAL_STATE = {
  isLoading: true,
  snippets: [],
  hasErrored: false,
  nextHref: null,
  prevHref: null,
  ignoreLastFetch: null,
  error: '',
};


export default (state = INITIAL_STATE, action) => {
  // console.log('action: ', action);
  switch (action.type) {
    case actionTypes.LIST_IS_LOADING:
      return { ...state, isLoading: true };
    case actionTypes.FETCH_LIST_SUCCESS:
      return { ...state,
        snippets: action.payload.data.results,
        isLoading: false,
        nextHref: action.payload.data.next,
        prevHref: action.payload.data.previous,
        ignoreLastFetch: false,
      };
    case actionTypes.FETCH_LIST_FAILED:
      return { ...state, hasErrored: true };
    case actionTypes.RESET_LIST:
      return INITIAL_STATE;
    case actionTypes.SET_IGNORE_LAST_FETCH:
      return { ...state, ignoreLastFetch: action.payload };
    default:
      return state;
  }
};
