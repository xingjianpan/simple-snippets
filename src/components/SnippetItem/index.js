import React from 'react'
import Loading from 'react-loading'
import { browserHistory } from 'react-router';


const SnippetItem = (snippet) => {
  const { title, code } = snippet;
  return (
    <div>
      <h2> {title} </h2>
      <p> { code } </p>
    </div>
    )
}


export default SnippetItem;
