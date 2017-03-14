import React, { Component } from 'react';
import SnippetItem from '../SnippetItem';

const SnippetList = ({ snippets, onSnippetClick }) => (
  <div className="card-list">
    {snippets.map(snippet =>
      <SnippetItem
        key={snippet.id}
        {...snippet}
        onClick={() => onSnippetClick(snippet.id)}
      />,
    )}
  </div>
);

export default SnippetList;
