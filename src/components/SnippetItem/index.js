import React from 'react';



const SnippetItem = ({ title, language, owner, code, onClick }) => {
  return (
    <div className="snippet-page">
      <div className="card">
        <div className="card-block">
          <h4 className="card-title" onClick={onClick}>{title}</h4>
          <p className="card-text">{language}</p>
          <p className="card-text">{code} </p>
          <div className="card-text">{owner}</div>
        </div>
      </div>
    </div>
  );
};


export default SnippetItem;
