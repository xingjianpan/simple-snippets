import React from 'react';
import SnippetList from '../../containers/SnippetListContainer';
import { FILTER_SNIPPETS_BY_LANGUAGE_URL } from '../../services/api';

const FilterSnippets = (props) => {
  const language = props.params.language;
  return (
    <SnippetList
      targetUrl={`${FILTER_SNIPPETS_BY_LANGUAGE_URL}/${language}/`}
    />
  );
};

export default FilterSnippets;
