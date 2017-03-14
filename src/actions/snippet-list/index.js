import axios from 'axios';
import * as actionTypes from '../../constants/actionTypes';
import { SNIPPET_ROOT_URL } from '../../services/api';

export const fetchListSuccess = (response) => {
  // console.log(response)
  return {
    type: actionTypes.FETCH_LIST_SUCCESS,
    payload: response,
  };
};


export const fetchListFailed = (bool) => {
  return {
    type: actionTypes.FETCH_LIST_FAILED,
    payload: bool,
  };
};

export const setIgnoreLastFetch = (bool) => {
  return {
    type: actionTypes.SET_IGNORE_LAST_FETCH,
    payload: bool,
  };
};

export const ListIsLoading = (bool) => {
  return {
    type: actionTypes.LIST_IS_LOADING,
    payload: bool,
  };
};

export const fetchList = (url = `${SNIPPET_ROOT_URL}/snippets/`) => {
  return (dispatch) => {
    dispatch(ListIsLoading(true));

    axios.get(url)
      .then((response) => {
        dispatch(fetchListSuccess(response))
      })
      .catch(() => dispatch(fetchListFailed(true)));
  };
};

export const resetList = () => {
  return {
    type: actionTypes.RESET_LIST,
  };
};




