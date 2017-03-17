import axios from 'axios';
import * as actionTypes from '../../constants/actionTypes';
import { SEARCH_SNIPPETS_URL } from '../../services/api';


export const searchSnippetsSearching = (bool) => {
  return {
    type: actionTypes.SEARCH_SNIPPETS_SEARCHING,
    payload: bool,
  };
};

export const searchSnippetsSuccess = (response) => {
  return {
    type: actionTypes.SEARCH_SNIPPETS_SUCCESS,
    payload: response,
  };
};

export const searchSnippetsFailed = (bool) => {
  return {
    type: actionTypes.SEARCH_SNIPPETS_FAIL,
    payload: bool,
  };
};

// export const searchSnippets = ({searchTerm}) => {
//   return (dispatch) => {
//     dispatch(searchSnippetsSearching(true));
//     axios.get(`${SEARCH_SNIPPETS_URL}/${searchTerm}/`, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } })
//       .then((response) => {
//         dispatch(searchSnippetsSuccess(response));
//       })
//       .catch(() => dispatch(searchSnippetsFailed(true)));
//   };
// };

export const searchSnippets = (formProps) => {
  const title = formProps.title === undefined ? '' : formProps.title;
  const description = formProps.description === undefined ? '' : formProps.description;
  return (dispatch) => {
    dispatch(searchSnippetsSearching(true));
    axios.get(`${SEARCH_SNIPPETS_URL}/?title=${title}&description=${description}`, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } })
      .then((response) => {
        dispatch(searchSnippetsSuccess(response));
      })
      .catch(() => dispatch(searchSnippetsFailed(true)));
  };
};

export const resetForm = () => {
  return {
    type: actionTypes.RESET_SEARCH_FORM,
  };
};
