import React from 'react';
import SnippetLink from '../SnippetLink';

const SnippetList = ({ snippets, onSnippetClick }) => (
  <div className="card-list">
    {snippets.map(snippet =>
      <SnippetLink
        key={snippet.id}
        {...snippet}
        onClick={() => onSnippetClick(snippet.id)}
      />,
    )}
  </div>
);

export default SnippetList;
