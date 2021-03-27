import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/Forgotpassword';
import Captcha from '../Captcha';


const validate = values => {
    const errors = {}
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) && values.email) {
        errors.email = 'Invalid email address'
    }

    if (!values.username && !values.email) {
        errors.email = 'Either Email or Username Required';
        errors.username = 'Either Email or Username Required'
    } 

    if (!values.captcha) {
      errors.captcha = 'Recaptcha Required';
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


const ForgotPasswordForm = props => {
  const { handleSubmit, pristine, reset, submitting, language, recaptchaText, onRecaptcaClick } = props;
  const translations = {
    emailAddress:  language === 'en' ? messages.en.emailAddress : messages.ru.emailAddress,
    username:  language === 'en' ? messages.en.username : messages.ru.username,
    enterTextInBlue:  language === 'en' ? messages.en.enterTextInBlue : messages.ru.enterTextInBlue,
  }
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
              <FormattedMessage id="pleaseEnter" /><br/><br/>
              <FormattedMessage id="verifyaddress" /><br/><br/>
              <table>
                  <tbody>
                      <tr><td><Field  name="email"   component={renderField} type="text" label={translations.emailAddress} /></td></tr>
                      <tr><td><br/><FormattedMessage id="andor" /><br/><br/></td></tr>
                      <tr><td><Field  name="username"   component={renderField} label={translations.username}/></td></tr>
                      <tr><td><Field  name="captcha"   component={renderField}    type="text" label={translations.enterTextInBlue} /></td></tr>
                      <tr><td><Captcha text={recaptchaText} onClick={onRecaptcaClick}/></td></tr>
                  </tbody>
              </table>
          </div>
        </div>
        <br/><br/>
        <div>
          <button type="submit" className="btn btn-primary" disabled={pristine || submitting}><FormattedMessage id="send" /></button>&nbsp;&nbsp;&nbsp;
          <button type="button" className="btn btn-danger" disabled={pristine || submitting} onClick={reset}><FormattedMessage id="clearValues" /></button>
        </div>
      </form>
    </IntlProvider>
  );
};

export default reduxForm({
  form: 'forgotPasswordFormRedux', 
  validate
})(ForgotPasswordForm);