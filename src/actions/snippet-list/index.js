import axios from 'axios';
import * as actionTypes from '../../constants/actionTypes';
import { PUBLIC_SNIPPETS_URL } from '../../services/api';

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


export const ListIsLoading = (bool) => {
  return {
    type: actionTypes.LIST_IS_LOADING,
    payload: bool,
  };
};

const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return { headers: { Authorization: `Token ${token}` } };
  }
  return {};
};

export const fetchList = (url = `${PUBLIC_SNIPPETS_URL}/`) => {
  return (dispatch) => {
    dispatch(ListIsLoading(true));
    const token = getToken();
    axios.get(url, token)
      .then((response) => {
        dispatch(fetchListSuccess(response))
      })
      .catch(
        (error) => dispatch(fetchListFailed(true))
    );
  };
};

export const infiniteLoadSuccess = (response) => {
  return {
    type: actionTypes.INFINITE_LOAD_SUCCESS,
    payload: response,
  };
};


export const infiniteLoadFailed = (bool) => {
  return {
    type: actionTypes.INFINITE_LOAD_FAIL,
    payload: bool,
  };
};

export const infiniteLoading = (bool) => {
  return {
    type: actionTypes.INFINITE_IS_LOADING,
    payload: bool,
  };
};

export const infiniteLoadEndOfList = (response) => {
  return {
    type: actionTypes.INFINITE_LOAD_END_OF_LIST,
    payload: response,
  };
};

export const infiniteLoad = (url = `${PUBLIC_SNIPPETS_URL}/`) => {
  return (dispatch) => {
    dispatch(infiniteLoading(true));
    const token = getToken();
    axios.get(url, token)
      .then((response) => {
        if (response.data.next) {
          dispatch(infiniteLoadSuccess(response));
        } else {
          dispatch(infiniteLoadEndOfList(response));
        }
      })
      .catch(() => dispatch(infiniteLoadFailed(true)))
      ;
  };
};

export const resetList = () => {
  return {
    type: actionTypes.RESET_LIST,
  };
};

