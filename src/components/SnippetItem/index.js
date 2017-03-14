import React from 'react';
import Loading from 'react-loading';
import { browserHistory } from 'react-router';


const SnippetItem = ({ title, language, owner, onClick }) => {
  return (
    <div className="card">
      <div onClick={onClick}> <p>{title}</p> </div>
      <div><p> { language }</p> </div>
      <div>{owner}</div>
    </div>
  );
};


export default SnippetItem;
