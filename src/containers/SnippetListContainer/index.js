import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchList, setIgnoreLastFetch } from '../../actions';
import SnippetList from '../../components/SnippetList';

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
        onSnippetClick={() => {console.log('hi')}}
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

