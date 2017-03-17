import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducers';
import notificationReducer from './notification_reducers';
import snippetListReducer from './snippet_list_reducers';
import snippetItemReducer from './snippet_item_reducers';
import searchSnippetsReducer from './search_snippets_reducers';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  notifications: notificationReducer,
  snippet_list: snippetListReducer,
  snippet: snippetItemReducer,
  search: searchSnippetsReducer,
});

export default rootReducer;
