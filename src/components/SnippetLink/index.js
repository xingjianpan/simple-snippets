import React from 'react';

const SnippetLink = ({ title, language, owner, onClick }) => {
  return (
    <div className="card">
      <div className="card-block">
        <a className="card-title" onClick={onClick}>{title}</a>
        <p className="card-text">{language}</p>
        <div className="card-text">{owner}</div>
      </div>
    </div>
  );
};


export default SnippetLink;
