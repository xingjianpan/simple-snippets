import * as actionTypes from '../constants/actionTypes';

const INITIAL_STATE = {
  isSearching: false,
  snippets: [],
  hasErrored: false,
  nextHref: null,
  prevHref: null,
  error: '',
};


export default (state = INITIAL_STATE, action) => {
  // console.log('action: ', action);
  switch (action.type) {
    case actionTypes.SEARCH_SNIPPETS_SEARCHING:
      return { ...state, isSearching: true };
    case actionTypes.SEARCH_SNIPPETS_SUCCESS:
      return { ...state,
        snippets: action.payload.data.results,
        isSearching: false,
        nextHref: action.payload.data.next,
        prevHref: action.payload.data.previous,
      };
    case actionTypes.SEARCH_SNIPPETS_FAIL:
      return { ...state, hasErrored: true };
    default:
      return INITIAL_STATE;
  }
};
