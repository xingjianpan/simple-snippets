import React from 'react';
import TimeAgo from 'react-timeago'

const SnippetLink = ({ id, title, language, description, owner, created, onClick }) => {
  return (
    <div className="snippet-link">
      <div className="card">
        <div className="card-block">
          <h4 className="code-title" onClick={onClick}>{title}</h4>
          <span className="code-language">{language}</span>
          <p className="code-description">{description}</p>
          <div className="code-owner">{id}</div>
          <div className="code-createtime"><TimeAgo date={created} /> by {owner}</div>
        </div>
      </div>
    </div>
  );
};


export default SnippetLink;
