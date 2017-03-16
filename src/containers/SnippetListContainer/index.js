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


  handleInfiniteLoad(url) {
    if (this.props.hasMoreToLoad) {
      this.props.infiniteLoad(url);
    }
  }

  elementInfiniteLoad() {
    return <div className="infinite-list-item"> Loading... </div>;
  }

  renderEndOfList() {
    if (!this.props.hasMoreToLoad) {
      return <div> End of list </div>;
    }
    if (this.props.infiniteLoadHasError) {
      return <div> Error loading more items</div>;
    }
    return ;
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
      <div className="main">
        <Infinite
          elementHeight={150}
          containerHeight={300}
          useWindowAsScrollContainer
          infiniteLoadBeginEdgeOffset={60}
          onInfiniteLoad={() =>{ this.handleInfiniteLoad(this.props.nextHref) }}
          loadingSpinnerDelegate={this.props.isInfiniteLoading && this.elementInfiniteLoad()}
          isInfiniteLoading={this.props.isInfiniteLoading}
          timeScrollStateLastsForAfterUserScrolls={1000}

        >
          {this.props.snippets.map(snippet =>
            <SnippetLink
              key={snippet.id}
              {...snippet}
              onClick={(id) => { browserHistory.push(`snippet/${snippet.id}`); }}
            />,
          )}
        </Infinite>
        { this.renderEndOfList()}
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  const { snippets, isLoading, hasErrored,
          nextHref, prevHref, ignoreLastFetch,
          isInfiniteLoading, hasMoreToLoad,
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
    hasMoreToLoad,
  };
};

export default connect(mapStateToPros,
  { fetchList, setIgnoreLastFetch, hideNotification, infiniteLoad })(SnippetListContainer);

