import React from 'react';
import Frame from 'react-frame-component';


const SnippetItem = ({ title, language, owner, code, onClick, highlightCode }) => {
  return (
    <div className="snippet-page">
      <div className="embed-responsive embed-responsive-16by9">
        <Frame className="embed-responsive-item" >
          <div dangerouslySetInnerHTML={{ __html: highlightCode }} />
        </Frame>
      </div>
    </div>
  );
};


export default SnippetItem;
