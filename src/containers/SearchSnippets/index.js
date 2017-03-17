import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Loading from 'react-loading';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { searchSnippets } from '../../actions';
import { renderField } from '../../helpers';
import SnippetLink from '../../components/SnippetLink';

const validate = (values) => {
  const errors = {};
  if (!values.searchTerm) {
    errors.searchTerm = 'required field';
  }
  return errors;
};

class SearchSnippet extends Component {

  handleFormSubmit(formProps) {
    this.props.searchSnippets(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Opps!</strong>
          {this.props.errorMessage}
        </div>
      );
    }
  }

  renderForm() {
      const { handleSubmit } = this.props;
      return(
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="additem-form">
          <fieldset className="form-group">
            <Field label="SearchTerm" name="searchTerm" component={renderField} type="text" />
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Search Snippet</button>
        </form>
        )
  }

  renderSearchResults() {
    if (this.props.hasErrored) {
      return <p>Sorry, we cannot search any snippets, please refresh。</p>;
    }
    if (this.props.isSearching) {
      return <p>Searching...</p>;
    }
    return (
      <div>
        {this.props.snippets.map(snippet =>
          <SnippetLink
            key={snippet.id}
            {...snippet}
            onClick={(id) => { browserHistory.push(`snippet/${snippet.id}`); }}
          />,
        )}
      </div>
    )
  }
  render() {

    return (
      <div>
        {this.renderForm()}
        {this.renderSearchResults()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isSearching, snippets, hasErrored, nextHref, prevHref } = state.search;
  return {
    isSearching,
    snippets,
    hasErrored,
    nextHref,
    prevHref,
  };
}

SearchSnippet = reduxForm({
  form: 'search-snippet',
  validate,
})(SearchSnippet);

SearchSnippet = connect(mapStateToProps, { searchSnippets })(SearchSnippet);

// do not forget to export default
export default SearchSnippet;
