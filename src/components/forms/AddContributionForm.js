import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/forms/AddContributionForm';
import SmartTextArea from '../formelements/SmartTextArea';



const validate = values => {
    const errors = {}
    if (!values.question) { errors.question = 'Required'  } else if (values.question.length > 1000) { errors.question = 'Must be 1000 characters or less'}
    if (!values.firstAnswer) {  errors.firstAnswer = 'Required'  } else if (values.firstAnswer.length > 1000) { errors.firstAnswer = 'Must be 1000 characters or less'}
    if (!values.secondAnswer) {  errors.secondAnswer = 'Required'  } else if (values.secondAnswer.length > 1000) { errors.secondAnswer = 'Must be 1000 characters or less'}
    if (!values.thirdAnswer) { errors.thirdAnswer = 'Required' } else if (values.thirdAnswer.length > 1000) { errors.thirdAnswer = 'Must be 1000 characters or less'}
    if (!values.fourthAnswer) { errors.fourthAnswer = 'Required'  } else if (values.fourthAnswer.length > 1000) { errors.fourthAnswer = 'Must be 1000 characters or less'}
    return errors
  }

const AddContributionForm = props => {
  const { handleSubmit, pristine, reset, submitting, language, backNavigation, valid } = props;
  const translations = {
    firstAnswer:  language === 'en' ? messages.en.firstAnswer : messages.ru.firstAnswer,
    secondAnswer:  language === 'en' ? messages.en.secondAnswer : messages.ru.secondAnswer,
    thirdAnswer:  language === 'en' ? messages.en.thirdAnswer : messages.ru.thirdAnswer,
    fourthAnswer:  language === 'en' ? messages.en.fourthAnswer : messages.ru.fourthAnswer,
    question: language === 'en' ? messages.en.question : messages.ru.question,
    clearValues: language === 'en' ? messages.en.clearValues : messages.ru.clearValues,
  }
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <form onSubmit={handleSubmit}>
          <br/> <br />
        <div>
            <table style={{width: "100%"}} className="contributionForm">
                <tbody>
                  <tr><td><Field  name="question"   component={SmartTextArea} label={translations.question} /></td></tr>
                  <tr><td><br/><br/></td></tr>
                  <tr><td><Field  name="firstAnswer"   component={SmartTextArea} label={translations.firstAnswer} /></td></tr>
                  <tr><td><Field  name="secondAnswer"   component={SmartTextArea} label={translations.secondAnswer} /></td></tr>
                  <tr><td><Field  name="thirdAnswer"   component={SmartTextArea} label={translations.thirdAnswer} /></td></tr>
                  <tr><td><Field  name="fourthAnswer"   component={SmartTextArea} label={translations.fourthAnswer} /></td></tr>

                </tbody>
            </table>
        </div>
        <br/><br/>
        <div>
          <button type="submit" className="btn btn-primary" disabled={pristine || submitting || !valid}><FormattedMessage id="sendQuestion" /></button>&nbsp;&nbsp;&nbsp;
          <button type="button" className="btn btn-danger" disabled={pristine || submitting} onClick={reset}><FormattedMessage id="clearValues" /></button>
        </div>
      </form>
    </IntlProvider>
  );
};

export default reduxForm({
  form: 'addContibutionFormRedux', 
  validate
})(AddContributionForm);