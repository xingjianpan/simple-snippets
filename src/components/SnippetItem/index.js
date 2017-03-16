import React from 'react';
import Frame from 'react-frame-component';
import SnippetLink from '../SnippetLink'

const SnippetItem = ({ snippet, highlightCode }) => {
  // console.log(snippet)
  return (
    <div className="snippet-page">
      <h4>Information</h4>
      <SnippetLink {...snippet} />
      <h4>Code:</h4>
      <div className="embed-responsive embed-responsive-16by9">
        <Frame className="embed-responsive-item" >
          <div dangerouslySetInnerHTML={{ __html: highlightCode }} />
        </Frame>
      </div>

    </div>
  );
};


export default SnippetItem;
