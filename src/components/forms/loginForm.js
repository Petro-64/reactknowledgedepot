import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/Login';
import SmartField from '../formelements/SmartField';
import { Link } from 'react-router-dom';



const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = 'Required'
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


const LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting, errorMessage, errorMessageVisibility, language } = props;
  const translations = {
    emailAddress:  language === 'en' ? messages.en.emailAddress : messages.ru.emailAddress,
    password:  language === 'en' ? messages.en.password : messages.ru.password,
  }
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
              <table>
                  <tbody>
                      <tr><td><Field  name="email"   component={renderField} type="text" label={translations.emailAddress} /></td></tr>
                      <tr><td><Field  name="password"   component={SmartField} label={translations.password} toShowPasswordMeter={false}/></td></tr>
                      <tr style={{visibility: `${errorMessageVisibility}`}}><td><span className="error">{errorMessage}</span></td></tr>
                  </tbody>
              </table>
          </div>
        </div>
        <Link to="/app/forgotpassword"><FormattedMessage id="forgotpassword" /></Link>
        <br/><br/>
        <div>
          <button type="submit" className="btn btn-primary" disabled={pristine || submitting}><FormattedMessage id="login" /></button>&nbsp;&nbsp;&nbsp;
          <button type="button" className="btn btn-danger" disabled={pristine || submitting} onClick={reset}><FormattedMessage id="clearValues" /></button>
        </div>
      </form>
    </IntlProvider>
  );
};

export default reduxForm({
  form: 'loginFormRedux', 
  validate
})(LoginForm);