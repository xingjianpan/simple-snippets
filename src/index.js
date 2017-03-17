import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import requireAuth from './components/Auth/require_authentication';
import Signin from './components/Auth/Signin';
import Signout from './components/Auth/Signout';
import Signup from './components/Auth/Signup';
import AddSnippet from './containers/AddSnippet';
import EditSnippet from './containers/EditSnippet';
import SnippetItem from './containers/SnippetItemContainer';
import SearchSnippets from './containers/SearchSnippets';
import UserSnippets from './components/UserSnippets';
import PublicSnippets from './components/PublicSnippets';
import FilterSnippets from './components/FilterSnippets';
import { getUserDetails } from './actions';
import configureStore from './stores/configureStore';
// css
import './index.css';

const store = configureStore();
const token = localStorage.getItem('token');
// if we have a token, consider the use to be signin
if (token) {
  // we need to update the application state
  store.dispatch(getUserDetails(token));
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={PublicSnippets} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="snippet/:snippetId" component={SnippetItem} />
        <Route path="snippets/add" component={requireAuth(AddSnippet)} />
        <Route path="snippet/:snippetId/edit" component={requireAuth(EditSnippet)} />
        <Route path="snippets/my" component={UserSnippets} />
        <Route path="language/:language" component={FilterSnippets} />
        <Route path="search" component={SearchSnippets} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
