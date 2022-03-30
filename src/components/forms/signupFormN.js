import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/index';
import Captcha from '../formelements/Captcha';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/Signupform';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const validate = (values, props) => {
    const errors = {}
    if (!values.name) {
      errors.name = messages[props.language].required;
    } else if (values.name.length < 4) {
      errors.name = messages[props.language].fourOrMore;
    }

    if (!values.email) {
        errors.email =  messages[props.language].required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = messages[props.language].emailIssue;
    }

    if (!values.password) {
        errors.password =  messages[props.language].required;
    } else if (values.password.length < 8) {
        errors.password = messages[props.language].eightOrMore;
    } else if (values.password.length > 15) {
        errors.password = messages[props.language].fifteenOrLess;
    }

    if (!values.passwordretype) {
        errors.passwordretype =  messages[props.language].required;
    } 

    if (!values.captcha) {
        errors.captcha =  messages[props.language].required;
    } 

    if((values.password && values.passwordretype) && values.password !== values.passwordretype){
        errors.password = messages[props.language].passworsNotMatching;
        errors.passwordretype = messages[props.language].passworsNotMatching;
    }

    return errors
  }

  const renderField = ({ input, name, label, type, meta: { touched, error, warning } }) => {
    let err = touched && (!!(error));
    let helpertextt = touched && error;
    return (<TextField id={name} name={name} {...input} label={label} error={err} helperText={helpertextt} size="small" variant="outlined" fullWidth />)
  }

  const renderPasswordField = ({ input,  name,  label,  type,  meta: { touched, error, warning }, whatToShow}) => {
      let err = touched && (!!(error));
      let helpertextt = touched && error;
      return (<TextField id={name} name={name} {...input} label={label} error={err} helperText={helpertextt} size="small" variant="outlined" fullWidth type={whatToShow}/>)
  }


let SignupFormN = props => {
  const { handleSubmit, pristine, reset, submitting, recaptchaText, onRecaptcaClick, language, valid, whatToShow, toggleVisibility } = props;
  const translations = {
    name:  language === 'en' ? messages.en.name : messages.ru.name,
    emailAddress:  language === 'en' ? messages.en.emailAddress : messages.ru.emailAddress,
    password:  language === 'en' ? messages.en.password : messages.ru.password,
    enterTextInBlue:  language === 'en' ? messages.en.enterTextInBlue : messages.ru.enterTextInBlue,
    confirmPasword: language === 'en' ? messages.en.confirmPasword : messages.ru.confirmPasword
  }

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <center><form onSubmit={handleSubmit}>
        <div>
          <div>
              <table className="loginFormWrapper">
                  <tbody>
                      <tr>
                        <td><Field  name="name"   component={renderField}  type="text"   label={translations.name} /></td>
                        <td></td>
                      </tr>
                      <tr><td><Field  name="email"   component={renderField}   type="text"   label={translations.emailAddress} /></td><td></td></tr>
                      <tr>
                        <td><Field  name="password"   component={renderPasswordField} label={translations.password} toShowPasswordMeter={true} whatToShow={whatToShow}/></td>
                        <td className="visibilityToggleWrapper"><span className="visibilityToggle" onClick={toggleVisibility}>&nbsp;&nbsp;&nbsp;<i className="fa fa-eye" aria-hidden="true" style={whatToShow === 'text' ? {opacity: 0.4} : {}}></i></span></td>
                      </tr>
                      <tr><td><Field  name="passwordretype"   component={renderPasswordField}    label={translations.confirmPasword} toShowPasswordMeter={true} whatToShow={whatToShow}/></td>
                      <td></td>
                      </tr>
                      <tr><td><Field  name="captcha"   component={renderField}    type="text" label={translations.enterTextInBlue} /></td><td></td></tr>
                      <tr><td><Captcha text={recaptchaText} onClick={onRecaptcaClick}/></td><td></td></tr>
                  </tbody>
              </table>
          </div>
        </div>
        <div>
          <Button type="submit" variant="contained" disabled={!valid || pristine || submitting}><FormattedMessage id="register" /></Button>&nbsp;&nbsp;&nbsp;
          <Button variant="contained" color="error" disabled={pristine || submitting} onClick={reset}><FormattedMessage id="clearValues" /></Button>
        </div>
      </form>
      </center>
    </IntlProvider>
  );
};

SignupFormN = reduxForm({
  form: 'signupForm', 
  validate,
})(SignupFormN);

const mapStateToProps=(state)=>{
  return {
    ...state.testReducer, ...state.loginSignUpReducer, ...state.settingsReducer
  };
}

SignupFormN = connect(
  state => ({
    initialValues: {captcha: ''} 
  })
)(SignupFormN)

export default connect(mapStateToProps, actionCreators)(SignupFormN);