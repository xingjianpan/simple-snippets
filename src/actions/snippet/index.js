import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../../constants/actionTypes';
import { SNIPPET_ROOT_URL, PUBLIC_SNIPPETS_URL } from '../../services/api';
import { fetchList } from '../../actions/snippet-list';

export const addItem = ({ title, code, linenos, language, style, ispublic, description }) => {
  return (dispatch) => {
    axios.post(
      `${SNIPPET_ROOT_URL}/`,
      { title, code, linenos, language, style, ispublic, description },
      { headers: { Authorization: `Token ${localStorage.getItem('token')}` } },
    )
    .then((response) => {
      browserHistory.push('/');
      dispatch(fetchList(`${SNIPPET_ROOT_URL}/`));
    });
  };
};

export const editItem = (item) => {
  const { id, title, code, linenos, language, style, ispublic, description } = item;
  return (dispatch) => {
    axios.put(
      `${SNIPPET_ROOT_URL}/${id}/`,
      { title, code, linenos, language, style, ispublic, description },
      { headers: { Authorization: `Token ${localStorage.getItem('token')}` } },
    )
    .then((response) => {
      browserHistory.push(`/snippet/${id}`);
    });
  };
};


export const deleteItem = (item) => {
  return (dispatch) => {
    //  The second parameter to axios.delete is config, not data
    axios.delete(
      `${SNIPPET_ROOT_URL}/${item.id}/`,
      { headers: { Authorization: `Token ${localStorage.getItem('token')}`} },
    ).then(() => {
      browserHistory.push('/');
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

    axios.all([
      axios.get(`${SNIPPET_ROOT_URL}/${id}/`),
      axios.get(`${SNIPPET_ROOT_URL}/${id}/highlight/`),
    ])
      .then(axios.spread(function (snippetResponse, highlightResponse) {
        dispatch(fetchItemSuccess(snippetResponse));
        dispatch(fetchHighlightSuccess(highlightResponse));
      }))
      .catch(()=> dispatch(fetchItemFailed(true)));
  };
};

