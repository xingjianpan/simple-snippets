import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Loading from 'react-loading';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { searchSnippets, resetForm } from '../../actions';
import { renderField } from '../../helpers';
import SnippetLink from '../../components/SnippetLink';

const validate = (values) => {
  const errors = {};
  if (!values.title && !values.description) {
    errors.title = 'please input at least one ';
    errors.description = 'please input at least one';
  }
  return errors;
};

class SearchSnippet extends Component {

  handleFormSubmit(formProps) {
    // console.log(formProps)
    this.props.searchSnippets(formProps);
  }


  componentWillUnmount() {
    // console.log('will unmount');
    this.props.resetForm();
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
            <Field label="Title" name="title" component={renderField} type="text" />
          </fieldset>
          <fieldset className="form-group">
            <Field label="Description" name="description" component={renderField} type="text" />
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

SearchSnippet = connect(mapStateToProps, { searchSnippets, resetForm })(SearchSnippet);

// do not forget to export default
export default SearchSnippet;
