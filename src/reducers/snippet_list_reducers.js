// https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3#.kcdd1ivn5

import * as actionTypes from '../constants/actionTypes';

const INITIAL_STATE = {
  isLoading: true,
  snippets: [],
  hasErrored: false,
  nextHref: null,
  prevHref: null,
  error: '',
  isInfiniteLoading: false,
  hasMoreToLoad: true,
  infiniteLoadHasError: false,
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
      };
    case actionTypes.FETCH_LIST_FAILED:
      return { ...state, hasErrored: true };
    case actionTypes.RESET_LIST:
      return INITIAL_STATE;

    case actionTypes.INFINITE_IS_LOADING:
      return { ...state, isInfiniteLoading: action.payload };
    case actionTypes.INFINITE_LOAD_SUCCESS:
      return { ...state,
        isInfiniteLoading: false,
        snippets: [...state.snippets, ...action.payload.data.results],
        nextHref: action.payload.data.next,
      };
    case actionTypes.INFINITE_LOAD_END_OF_LIST:
      return { ...state,
        isInfiniteLoading: false,
        hasMoreToLoad: false,
        snippets: [...state.snippets, ...action.payload.data.results],
      };
    case actionTypes.INFINITE_LOAD_FAIL:
      return { ...state, infiniteLoadHasError: true };
    default:
      return { ...state };
  }
};
