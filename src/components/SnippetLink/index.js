import React from 'react';

const SnippetLink = ({ id, title, language, description, owner, onClick }) => {
  return (
    <div className="snippet-link">
      <div className="card">
        <div className="card-block">
          <h4 className="code-title" onClick={onClick}>{id} {title}</h4>
          <span className="code-language">{language}</span>
          <p className="code-description">{description}</p>
          <div className="code-owner">{owner}</div>
        </div>
      </div>
    </div>
  );
};


export default SnippetLink;
