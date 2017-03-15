import * as actionTypes from '../constants/actionTypes';

const INITIAL_STATE = {
  isLoading: true,
  snippet: {},
  hasErrored: false,
};


export default (state = INITIAL_STATE, action) => {
  // console.log('action: ', action);
  switch (action.type) {
    case actionTypes.ITEM_IS_LOADING:
      return { ...state, isLoading: true };
    case actionTypes.FETCH_ITEM_SUCCESS:
      return { ...state, snippet: action.payload.data, isLoading: false };
    case actionTypes.FETCH_ITEM_FAILED:
      return { ...state, hasErrored: true };
    default:
      return state;
  }
};
