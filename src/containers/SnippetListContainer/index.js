import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchList, setIgnoreLastFetch } from '../../actions';
import SnippetList from '../../components/SnippetList';
import { browserHistory } from 'react-router';

class SnippetListContainer extends Component {
  componentDidMount() {
    if (!this.props.ignoreLastFetch) {
      this.props.fetchList();
    }
  }

  componentWillUnmount() {
    // this.props.resetNewsList();
    this.props.setIgnoreLastFetch(true);
  }

  fetchMore(url) {
    this.props.fetchPostList(url);
  }


  render() {
    return (
      <SnippetList
        snippets={this.props.snippets}
        onSnippetClick={(id) => {
          browserHistory.push(`snippet/${id}`);
        }}
      />
    );
  }
}

const mapStateToPros = (state) => {
  const { snippets } = state.snippet_list;
  return {
    snippets,
  };
};

export default connect(mapStateToPros,
  { fetchList, setIgnoreLastFetch })(SnippetListContainer);

