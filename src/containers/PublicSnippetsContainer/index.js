import React from 'react';
import SnippetList from '../SnippetListContainer';
import { PUBLIC_SNIPPETS_URL } from '../../services/api';

const PublicSnippets = () =>  {
  return <SnippetList targetUrl={`${PUBLIC_SNIPPETS_URL}/`} />;
};

export default PublicSnippets;
