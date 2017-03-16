import React from 'react';
import SnippetList from '../SnippetListContainer';
import { PUBLIC_SNIPPETS_URL } from '../../services/api';

const PublicSnippets = () =>  {
  return (
    <div>
      <ul>
        <li>python</li>
        <li>javascript</li>
      </ul>
      <SnippetList targetUrl={`${PUBLIC_SNIPPETS_URL}/`} />;
    </div>
  )
};

export default PublicSnippets;
