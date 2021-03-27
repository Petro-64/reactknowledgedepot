import React from 'react';
import { Field, reduxForm } from 'redux-form';
import SmartField from '../formelements/SmartField';

const validate = values => {
    const errors = {}
    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 8) {
        errors.password = 'Must be 8 characters or more'
    } else if (values.password.length > 15) {
        errors.password = 'Must be 15 characters or less'
    }

    if (!values.repeatPassword) {
        errors.repeatPassword = 'Required'
    } 

    if (values.repeatPassword != values.password){
        errors.repeatPassword = 'Passwords do not match';
        errors.password = 'Passwords do not match'
    }

    return errors
}

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched &&
          ((error && <span className="error">{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )


const ChangePasswordForm = props => {
  const { handleSubmit, pristine, reset, submitting, valid, submitLabel, clearValues, enterNewPassw, repeatNewPassw } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
            <table>
                <tbody>
                    <tr><td><Field  name="password"   
                    component={SmartField}   
                    type="password"   
                    label={enterNewPassw} 
                    /></td></tr>
                    <tr><td><Field  name="repeatPassword"   component={SmartField}    type="password"   label={repeatNewPassw} /></td></tr>
                </tbody>
            </table>
         </div>
      </div>
      <div>
        <br /><br />
      <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>{submitLabel}</button>&nbsp;&nbsp;
      <button type="button" className="btn btn-danger" disabled={pristine || submitting} onClick={reset}>{clearValues}</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'changePasswordFormRedux', 
  validate
})(ChangePasswordForm);