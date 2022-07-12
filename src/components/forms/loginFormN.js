import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/Login';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const validate = (values, props) => {
    const errors = {}
    if (!values.email) {  errors.email =  messages[props.language].required;  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {  errors.email = messages[props.language].emailIssue  }
    if (!values.password) {   errors.password =  messages[props.language].required; } 
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

const LoginFormN = props => {
  const { handleSubmit, pristine, reset, submitting, errorMessage, errorMessageVisibility, language, valid, whatToShow, toggleVisibility } = props;
  const translations = {
    emailAddress:  language === 'en' ? messages.en.emailAddress : messages.ru.emailAddress,
    password:  language === 'en' ? messages.en.password : messages.ru.password,
  }



  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <form onSubmit={handleSubmit}>
        <table className="loginFormWrapper">
            <tbody>
                <tr>
                    <td><Field  name="email"  component={renderField} type="text" label={translations.emailAddress} /></td><td></td>
                </tr>
                <tr>
                    <td ><Field  name="password"   component={renderPasswordField} label={translations.password} whatToShow={whatToShow} /></td>
                    <td className="visibilityToggleWrapper"><span className="visibilityToggle" onClick={toggleVisibility}>&nbsp;&nbsp;&nbsp;<i className="fa fa-eye" aria-hidden="true" style={whatToShow === 'text' ? {opacity: 0.4} : {}}></i></span></td>
                </tr>
                <tr style={{visibility: `${errorMessageVisibility}`}}><td><span className="error">{errorMessage}</span></td></tr>
            </tbody>
        </table>
        <Link to="/app/forgotpassword"><FormattedMessage id="forgotpassword" /></Link>
        <br/><br/>
        <div>
          <Button type="submit" variant="contained" disabled={!valid || pristine || submitting}><FormattedMessage id="login" /></Button>&nbsp;&nbsp;&nbsp;
          <Button variant="contained" color="error" disabled={pristine || submitting} onClick={reset}><FormattedMessage id="clearValues" /></Button>&nbsp;&nbsp;&nbsp;
          <Link to="/app/signup"><Button variant="contained" color="error"><FormattedMessage id="signup" /></Button></Link>
        </div>
      </form>
    </IntlProvider>
  );
};

export default reduxForm({
  form: 'loginFormRedux', 
  validate
})(LoginFormN);

