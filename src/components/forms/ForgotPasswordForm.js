import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/Forgotpassword';
import Captcha from '../Captcha';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



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

  const renderField = ({ input, name, label, type, meta: { touched, error, warning } }) => {
    let err = touched && (!!(error));
    let helpertextt = touched && error;
    return (<TextField id={name} name={name} {...input} label={label} error={err} helperText={helpertextt} size="small" variant="outlined" fullWidth />)
  }

const ForgotPasswordForm = props => {
  const { handleSubmit, pristine, reset, submitting, language, recaptchaText, onRecaptcaClick, valid } = props;
  const translations = {
    emailAddress:  language === 'en' ? messages.en.emailAddress : messages.ru.emailAddress,
    username:  language === 'en' ? messages.en.username : messages.ru.username,
    enterTextInBlue:  language === 'en' ? messages.en.enterTextInBlue : messages.ru.enterTextInBlue,
  }
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <center>
        <form onSubmit={handleSubmit}>
        <div>
          <div>
              <table className="loginFormWrapper">
                  <tbody>
                      <tr><td><Field  name="email"   component={renderField} type="text" label={translations.emailAddress} /></td></tr>
                      <tr><td><FormattedMessage id="andor" /></td></tr>
                      <tr><td><Field  name="username"   component={renderField} label={translations.username}/></td></tr>
                      <tr><td><Field  name="captcha"   component={renderField}    type="text" label={translations.enterTextInBlue} /></td></tr>
                      <tr><td><Captcha text={recaptchaText} onClick={onRecaptcaClick}/></td></tr>
                  </tbody>
              </table>
          </div>
        </div>
        <div>
          <Button type="submit" variant="contained" disabled={!valid || pristine || submitting}><FormattedMessage id="send" /></Button>&nbsp;&nbsp;&nbsp;
          <Button variant="contained" color="error" disabled={pristine || submitting} onClick={reset}><FormattedMessage id="clearValues" /></Button>
        </div>
      </form>
      </center>
    </IntlProvider>
  );
};

export default reduxForm({
  form: 'forgotPasswordFormRedux', 
  validate
})(ForgotPasswordForm);