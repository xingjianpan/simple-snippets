// http://stackoverflow.com/questions/40815172/redux-form-textarea-error-handling
import React from 'react';

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

export { renderField };
