import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const checkPassword = (value, allValues, props ) => {
  if (!value) {
    return props.messages[props.language].required
  } else if (value.length < 8) {
    return props.messages[props.language].mustBe8CharOrMore
  } else if (value.length > 15) {
    return props.messages[props.language].mustBe15CharactersOrLess
  }

  if (allValues.repeatPassword !== allValues.password){
    return props.messages[props.language].passwordsDoNotMatch
  }
}

const renderPasswordField = ({ input,  name,  label,  type,  meta: { touched, error, warning }, whatToShow}) => {
  let err = touched && (!!(error));
  let helpertextt = touched && error;
  return (<TextField id={name} name={name} {...input} label={label} error={err} helperText={helpertextt} size="small" variant="outlined" fullWidth type={whatToShow}/>)
}

let ChangePasswordForm = props => {  
  const { handleSubmit, pristine, reset, submitting, valid, language, messages, whatToShow, toggleVisibility } = props;
  return (
    <center>
        <form onSubmit={handleSubmit}>
        <div>
          <div>
              <table className="loginFormWrapper">
                  <tbody>
                      <tr>
                        <td><Field  name="password" component={renderPasswordField} type="password" label={messages[language].enterNewPassw} validate={checkPassword}  whatToShow={whatToShow}/></td>
                        <td className="visibilityToggleWrapper"><span className="visibilityToggle" onClick={toggleVisibility}>&nbsp;&nbsp;&nbsp;<i className="fa fa-eye" aria-hidden="true" style={whatToShow === 'text' ? {opacity: 0.4} : {}}></i></span></td>
                      </tr>
                      <tr>
                        <td><Field  name="repeatPassword"   component={renderPasswordField}    type="password"   label={messages[language].repeatNewPassw} validate={checkPassword} lang={language} whatToShow={whatToShow}/></td>
                        <td className="visibilityToggleWrapper"></td>
                      </tr>
                  </tbody>
              </table>
          </div>
        </div>
        <div>
          <br /><br />
        <Button type="submit" variant="contained" disabled={!valid || pristine || submitting}>{messages[language].submit}</Button>&nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="error" disabled={pristine || submitting} onClick={reset}>{messages[language].clearValues}</Button>
        </div>
      </form>
    </center>
  );
};

ChangePasswordForm = reduxForm({
  form: 'changePasswordFormRedux'
})(ChangePasswordForm)

export default ChangePasswordForm

