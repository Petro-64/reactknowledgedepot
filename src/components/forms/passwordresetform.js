import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/Login';
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

    if (!values.repeatpassword) {
        errors.repeatpassword = 'Required'
    } else if (values.repeatpassword.length < 8) {
        errors.repeatpassword = 'Must be 8 characters or more'
    } else if (values.repeatpassword.length > 15) {
        errors.repeatpassword = 'Must be 15 characters or less'
    }

    if (values.repeatpassword != values.password) {
        errors.password = 'Password doesn\'t match';
        errors.repeatpassword = 'Password doesn\'t match';
    } 

    return errors
  }

const PasswordResetForm = props => {
  const { handleSubmit, pristine, reset, submitting, errorMessage, errorMessageVisibility, language } = props;
  const translations = {
    emailAddress:  language === 'en' ? messages.en.emailAddress : messages.ru.emailAddress,
    password:  language === 'en' ? messages.en.password : messages.ru.password,
    repeatpassword: language === 'en' ? messages.en.repeatpassword : messages.ru.repeatpassword,
  }
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
              <table>
                  <tbody>
                      <tr><td><Field  name="password"   component={SmartField} label={translations.password}  toShowPasswordMeter={true}/></td></tr>
                      <tr><td><Field  name="repeatpassword"   component={SmartField} label={translations.repeatpassword} toShowPasswordMeter={true}/></td></tr>
                      <tr style={{visibility: `${errorMessageVisibility}`}}><td><span className="error">{errorMessage}</span></td></tr>
                  </tbody>
              </table>
          </div>
        </div>
        <br/><br/>
        <div>
          <button type="submit" className="btn btn-primary" disabled={pristine || submitting}><FormattedMessage id="senddata" /></button>&nbsp;&nbsp;&nbsp;
          <button type="button" className="btn btn-danger" disabled={pristine || submitting} onClick={reset}><FormattedMessage id="clearValues" /></button>
        </div>
      </form>
    </IntlProvider>
  );
};

export default reduxForm({
  form: 'passwordresetform', 
  validate
})(PasswordResetForm);