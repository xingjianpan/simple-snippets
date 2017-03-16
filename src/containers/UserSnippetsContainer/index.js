import React, { Component } from 'react';
import SnippetList from '../SnippetListContainer';
import { USER_SNIPPETS_URL } from '../../services/api';

class UserSnippets extends Component {

  render() {
    return <SnippetList targetUrl={`${USER_SNIPPETS_URL}/`} />;
  }
}

export default UserSnippets;
