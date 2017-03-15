import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { editItem, fetchItem } from '../../actions';


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


// http://stackoverflow.com/questions/40815172/redux-form-textarea-error-handling
const renderField = ({ input, name, label, type, textarea, meta: { touched, error, warning, invalid } }) => {
  const textareaType = <textarea {...input} placeholder={label} type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`} />;
  const inputType = <input {...input} placeholder={label} type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`} />;

  return (
    <div className="form-fields">
      <label htmlFor={name} >{label}</label>
      <div>
        {textarea ? textareaType : inputType}
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};


class EditSnippet extends Component {

  componentDidMount() {
    this.props.fetchItem(this.props.params.snippetId);
  }

  handleFormSubmit(formProps) {
    this.props.editItem(formProps);
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
          <Field label="Title" name="title" component={renderField} type="text" />
        </fieldset>
        <fieldset className="form-group">
          <Field label="Code" name="code" component={renderField} type="text" textarea={true} />
        </fieldset>
        <fieldset className="form-group">
          <div className="form-fields">
            <label htmlFor="language">Language</label>
            <div>
              <Field name="language" component="select">
                <option value='' disabled>Choose here</option>
                <option value="python">Python</option>
                <option value="sql">SQL</option>
                <option value="javascript">Javascript</option>
              </Field>
            </div>
          </div>
        </fieldset>

        <fieldset className="form-group">
          <div className="form-fields">
            <label htmlFor="style">Style</label>
            <div>
              <Field name="style" component="select">
                <option value='' disabled>Choose here</option>
                <option value="vim">vim</option>
                <option value="friendly">friendly</option>
              </Field>
            </div>
          </div>
        </fieldset>

        <fieldset className="form-group">
          <div className="form-fields">
            <label htmlFor="ispublic">Public?</label>
            <div>
              <Field name="ispublic" component="input" type="checkbox" />
            </div>
          </div>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Edit Snippet</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.snippet_list.error,
    initialValues: state.snippet.snippet,
  };
}

EditSnippet = reduxForm({
  form: 'edit-snippet',
  validate,
  enableReinitialize: true,
})(EditSnippet);

EditSnippet = connect(mapStateToProps, { editItem, fetchItem })(EditSnippet);

// do not forget to export default
export default EditSnippet;

