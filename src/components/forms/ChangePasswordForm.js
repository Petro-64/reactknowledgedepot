import React from 'react';
import { Field, reduxForm } from 'redux-form';
import SmartField from '../formelements/SmartField';

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

let ChangePasswordForm = props => {  
  const { handleSubmit, pristine, reset, submitting, valid, language, messages } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
            <table>
                <tbody>
                    <tr><td><Field  name="password" component={SmartField} type="password" label={messages[language].enterNewPassw} validate={checkPassword}/></td></tr>
                    <tr><td><Field  name="repeatPassword"   component={SmartField}    type="password"   label={messages[language].repeatNewPassw} validate={checkPassword} lang={language}/></td></tr>
                </tbody>
            </table>
         </div>
      </div>
      <div>
        <br /><br />
      <button type="submit" className="btn btn-primary" disabled={pristine || submitting || !valid}>{messages[language].submit}</button>&nbsp;&nbsp;
      <button type="button" className="btn btn-danger" disabled={pristine || submitting} onClick={reset}>{messages[language].clearValues}</button>
      </div>
    </form>
  );
};

ChangePasswordForm = reduxForm({
  form: 'changePasswordFormRedux'
})(ChangePasswordForm)

export default ChangePasswordForm

