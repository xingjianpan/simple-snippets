import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import { fetchItem, deleteItem } from '../../actions';
import { browserHistory } from 'react-router';
import SnippetItem from '../../components/SnippetItem';

class SnippetItemContainer extends Component {
  componentDidMount() {
    this.props.fetchItem(this.props.params.snippetId);
  }

  componentDidUpdate(prevProps) {
    const oldId = prevProps.params.snippetId;
    const newId = this.props.params.snippetId;
    if (newId !== oldId) {
      this.props.fetchNewsItem(newId);
    }
  }

  handleEdit() {
    const currentPath = this.props.location.pathname;
    browserHistory.push(`${currentPath}/edit`);
  }

  renderEditor(snippet) {
    // show editor if current user is also the owner of the post
    if (this.props.user) {
      if (this.props.user.username === snippet.owner) {
        return (
          <div>
            <button onClick={() => { this.handleEdit(); }}>Edit</button>
            <button onClick={() => { this.props.deleteItem(snippet); }}>Delete</button>
          </div>
        );
      }
    }
  }


  render() {
    const snippet = this.props.snippet;
    const highlightCode = this.props.highlightCode;
    if (this.props.hasErrored) {
      return <p>抱歉，请刷新浏览器后再试试。</p>;
    }
    if (this.props.isLoading) {
      return <Loading type="bars" color="#e3e3e3" />;
    }
    document.title = this.props.snippet.title;
    return (
      <div>
        {this.renderEditor(snippet)}
        <SnippetItem snippet={snippet} highlightCode={highlightCode} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoading, snippet, hasErrored, highlightCode } = state.snippet;
  const { authenticated, user } = state.auth;
  // console.log(snippet)
  return {
    isLoading,
    snippet,
    highlightCode,
    hasErrored,
    authenticated,
    user,
  };
};

export default connect(mapStateToProps, { fetchItem, deleteItem })(SnippetItemContainer);

