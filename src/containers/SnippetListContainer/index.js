import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import Infinite from 'react-infinite';
import { browserHistory } from 'react-router';
import { fetchList, setIgnoreLastFetch, hideNotification, infiniteLoad } from '../../actions';
import SnippetLink from '../../components/SnippetLink';

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
    this.props.fetchList(url);
  }


  renderButton() {
    if (this.props.nextHref && this.props.prevHref) {
      return (
        <div>
          <span>
            <a href="#" onClick={() => { this.fetchMore(this.props.prevHref); }}>
              Previous Page
            </a>
          </span>
          {' '}
          <span className="page-control">
            <a href="#" onClick={() => { this.fetchMore(this.props.nextHref); }}>
              Next Page
            </a>
          </span>
        </div>
      );
    } else if (this.props.nextHref) {
      return <a href="#" onClick={() => { this.fetchMore(this.props.nextHref); }}>Next Page</a>
    } else if (this.props.prevHref) {
      return <a href="#" onClick={() => { this.fetchMore(this.props.prevHref); }}>Previous Page</a>
    }

    return <p></p>;
  }

  handleInfiniteLoad(url) {
    console.log(url)
    this.props.infiniteLoad(url);
  }

  elementInfiniteLoad() {
    return <div className="infinite-list-item"> Loading... </div>;
  }


  render() {
    if (this.props.hasErrored) {
      return <p>Sorry, we cannot retrieve any snippets, please refresh。</p>;
    }
    if (this.props.isLoading) {
      return <Loading type="bars" color="#e3e3e3" />;
    }
    document.title = 'Snippets Management';
    return (
      <Infinite
        elementHeight={100}
        containerHeight={300}
        useWindowAsScrollContainer
        infiniteLoadBeginEdgeOffset={60}
        onInfiniteLoad={() =>{ this.handleInfiniteLoad(this.props.nextHref) }}
        loadingSpinnerDelegate={this.elementInfiniteLoad()}
        isInfiniteLoading={this.props.isInfiniteLoading}
        timeScrollStateLastsForAfterUserScrolls={1000}
      >
      {this.props.snippets.map(snippet =>
        <SnippetLink
          key={snippet.id}
          {...snippet}

        />,
      )}

      </Infinite>
    );
  }
}

const mapStateToPros = (state) => {
  const { snippets, isLoading, hasErrored,
          nextHref, prevHref, ignoreLastFetch,
          isInfiniteLoading,
        } = state.snippet_list;
  const { isActive, message, action } = state.notifications;

  return {
    isLoading,
    snippets,
    hasErrored,
    nextHref,
    prevHref,
    ignoreLastFetch,
    isActive,
    message,
    action,
    isInfiniteLoading,
  };
};

export default connect(mapStateToPros,
  { fetchList, setIgnoreLastFetch, hideNotification, infiniteLoad })(SnippetListContainer);

