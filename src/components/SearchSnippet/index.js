import React from 'react';
import SnippetList from '../../containers/SnippetListContainer';
import { SEARCH_SNIPPETS_URL } from '../../services/api';

const SearchSnippets = (props) => {
  const language = props.params.language;
  return (
    <SnippetList
      targetUrl={`${SEARCH_SNIPPETS_URL}/${language}/`}
    />
  );
};

export default SearchSnippets;
