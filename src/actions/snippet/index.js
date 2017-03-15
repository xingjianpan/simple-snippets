import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../../constants/actionTypes';
import { SNIPPET_ROOT_URL } from '../../services/api';
import { fetchList, setIgnoreLastFetch } from '../../actions/snippet-list';

export const addItem = ({ title, code, linenos, language, style, ispublic }) => {
  return (dispatch) => {
    axios.post(
      `${SNIPPET_ROOT_URL}/snippets/`,
      { title, code, linenos, language, style, ispublic },
      { headers: { Authorization: `Token ${localStorage.getItem('token')}` } },
    )
    .then((response) => {
      browserHistory.push('/');
      dispatch(fetchList(`${SNIPPET_ROOT_URL}/snippets/`));
    });
  };
};

export const editItem = (item) => {
  const { id, title, code, linenos, language, style, ispublic } = item;
  return (dispatch) => {
    axios.put(
      `${SNIPPET_ROOT_URL}/snippets/${id}/`,
      { title, code, linenos, language, style, ispublic },
      { headers: { Authorization: `Token ${localStorage.getItem('token')}` } },
    )
    .then((response) => {
      dispatch(setIgnoreLastFetch(false));
      browserHistory.push(`/snippet/${id}`);
    });
  };
};


export const deleteItem = (item) => {
  return (dispatch) => {
    //  The second parameter to axios.delete is config, not data
    axios.delete(
      `${SNIPPET_ROOT_URL}/snippets/${item.id}/`,
      { headers: { Authorization: `Token ${localStorage.getItem('token')}`} },
    ).then(() => {
      browserHistory.push('/');
      // refresh
      dispatch(fetchList(SNIPPET_ROOT_URL));
    });
  };
};

export const fetchItemSuccess = (response) => {
  // console.log(response)
  return {
    type: actionTypes.FETCH_ITEM_SUCCESS,
    payload: response,
  };
};

export const fetchItemFailed = (bool) => {
  return {
    type: actionTypes.FETCH_ITEM_FAILED,
    payload: bool,
  };
};


export const ItemIsLoading = (bool) => {
  return {
    type: actionTypes.ITEM_IS_LOADING,
    payload: bool,
  };
};

export const fetchHighlight = (url) => {
  return (dispatch) => {
    axios.get(url)
      .then(response => dispatch(fetchHighlightSuccess(response)));
  };
};

export const fetchHighlightSuccess = (response) => {
  // console.log(response)
  return {
    type: actionTypes.FETCH_HIGHLIGHT_SUCCESS,
    payload: response,
  };
};

export const fetchItem = (id) => {
  return (dispatch) => {
    dispatch(ItemIsLoading(true));

    axios.get(`${SNIPPET_ROOT_URL}/snippets/${id}/`)
      .then((response) => {
        dispatch(fetchItemSuccess(response));
        dispatch(fetchHighlight(response.data.highlight));
      })
      .catch(()=> dispatch(fetchItemFailed(true)));
  };
};

