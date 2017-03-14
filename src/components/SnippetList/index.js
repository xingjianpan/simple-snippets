import React, { Component } from 'react';
import SnippetItem from '../SnippetItem';

const SnippetList = ({ snippets, onSnippetClick }) => (
  <div>
    {snippets.map(snippet =>
      <SnippetItem
        key={snippet.id}
        {...snippet}
        onClick={() => onSnippetClick(snippet.id)}
      />,
    )}
  </div>
);

export default SnippetList
