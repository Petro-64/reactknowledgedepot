import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/forms/AddContributionForm';
import SmartTextArea from '../formelements/SmartTextArea';
import Button from '@mui/material/Button';
import TextAreaCounterPeter from '../formelements/TextAreaCounterPeter';

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
  const { handleSubmit, pristine, reset, submitting, language, backNavigation, valid, navigateFunction } = props;
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
                  <tr><td><Field  name="question" component={TextAreaCounterPeter} limit={1000} label={translations.question} language={language}/></td></tr>
                  <tr><td><br/></td></tr>
                  <tr><td><Field  name="firstAnswer" component={TextAreaCounterPeter} limit={1000} label={translations.firstAnswer} language={language}/></td></tr>
                  <tr><td><Field  name="secondAnswer" component={TextAreaCounterPeter} limit={1000} label={translations.secondAnswer} language={language}/></td></tr>
                  <tr><td><Field  name="thirdAnswer" component={TextAreaCounterPeter} limit={1000} label={translations.thirdAnswer} language={language}/></td></tr>
                  <tr><td><Field  name="fourthAnswer" component={TextAreaCounterPeter} limit={1000} label={translations.fourthAnswer} language={language}/></td></tr>

                </tbody>
            </table>
        </div>
        <br/><br/>
        <div>
          <Button type="submit" variant="contained" disabled={pristine || submitting || !valid}><FormattedMessage id="sendQuestion" /></Button>&nbsp;&nbsp;&nbsp;
          <Button variant="contained" color="error" disabled={pristine || submitting} onClick={reset}><FormattedMessage id="clearValues" /></Button>&nbsp;&nbsp;&nbsp;
          <Button variant="contained" onClick={navigateFunction}><FormattedMessage id="seeMyContributionStatus" /></Button>
        </div>
      </form>
    </IntlProvider>
  );
};

export default reduxForm({
  form: 'addContibutionFormRedux', 
  validate
})(AddContributionForm);