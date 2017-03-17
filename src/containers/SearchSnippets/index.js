import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { searchSnippets } from '../../actions';
import { renderField } from '../../helpers';

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'required field';
  }
  if (!values.code) {
    errors.code = 'required field';
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

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="additem-form">
        <fieldset className="form-group">
          <Field label="SearchTerm" name="searchTerm" component={renderField} type="text" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Search Snippet</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.snippet_list.error };
}

SearchSnippet = reduxForm({
  form: 'search-snippet',
  validate,
})(SearchSnippet);

SearchSnippet = connect(mapStateToProps, { searchSnippets })(SearchSnippet);

// do not forget to export default
export default SearchSnippet;
