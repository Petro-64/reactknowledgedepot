import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/index';
import Captcha from '../formelements/Captcha';
import SmartField from '../formelements/SmartField';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/Signupform';


const validate = (values) => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Required'
    } else if (values.name.length < 4) {
      errors.name = 'Must be 4 characters or more'
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 8) {
        errors.password = 'Must be 8 characters or more'
    } else if (values.password.length > 15) {
        errors.password = 'Must be 15 characters or less'
    }

    if (!values.passwordretype) {
        errors.passwordretype = 'Required'
    } 

    if (!values.captcha) {
        errors.captcha = 'Required'
    } 

    if((values.password && values.passwordretype) && values.password !== values.passwordretype){
        errors.password = 'password not confirmed';
        errors.passwordretype = 'password not confirmed'
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


let SignupForm = props => {
  const { handleSubmit, pristine, reset, submitting, recaptchaText, onRecaptcaClick, language } = props;
  const translations = {
    name:  language === 'en' ? messages.en.name : messages.ru.name,
    emailAddress:  language === 'en' ? messages.en.emailAddress : messages.ru.emailAddress,
    password:  language === 'en' ? messages.en.password : messages.ru.password,
    enterTextInBlue:  language === 'en' ? messages.en.enterTextInBlue : messages.ru.enterTextInBlue,
    confirmPasword: language === 'en' ? messages.en.confirmPasword : messages.ru.confirmPasword
  }

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
              <table>
                  <tbody>
                      <tr><td><Field  name="name"   component={renderField}  type="text"   label={translations.name} /></td></tr>
                      <tr><td><Field  name="email"   component={renderField}   type="text"   label={translations.emailAddress} /></td></tr>
                      <tr><td><Field  name="password"   component={SmartField} label={translations.password} toShowPasswordMeter={true}/></td></tr>
                      <tr><td><Field  name="passwordretype"   component={SmartField}    label={translations.confirmPasword} toShowPasswordMeter={true}/></td></tr>
                      <tr><td><Field  name="captcha"   component={renderField}    type="text" label={translations.enterTextInBlue} /></td></tr>
                      <tr><td><Captcha text={recaptchaText} onClick={onRecaptcaClick}/></td></tr>
                  </tbody>
              </table>
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary" disabled={pristine || submitting}><FormattedMessage id="register" /></button>&nbsp;&nbsp;
          <button type="button" className="btn btn-danger" disabled={pristine || submitting} onClick={reset}><FormattedMessage id="clearValues" /></button>
        </div>
      </form>
    </IntlProvider>
  );
};

SignupForm = reduxForm({
  form: 'signupForm', 
  validate,
})(SignupForm);

const mapStateToProps=(state)=>{
  return {
    ...state.testReducer, ...state.loginSignUpReducer, ...state.settingsReducer
  };
}

SignupForm = connect(
  state => ({
    initialValues: {captcha: ''} 
  })
)(SignupForm)

export default connect(mapStateToProps, actionCreators)(SignupForm);