import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/forms/AddContributionForm';
import SmartTextArea from '../formelements/SmartTextArea';

const validate = values => {
    const errors = {}
    if (!values.question) { errors.question = 'Required'  } else if (values.question.length > 1000) { errors.question = 'Must be 1000 characters or less'}
    if (!values.uncorrect0) {  errors.uncorrect0 = 'Required'  } else if (values.uncorrect0.length > 1000) { errors.uncorrect0 = 'Must be 1000 characters or less'}
    if (!values.uncorrect1) {  errors.uncorrect1 = 'Required'  } else if (values.uncorrect1.length > 1000) { errors.uncorrect1 = 'Must be 1000 characters or less'}
    if (!values.uncorrect2) { errors.uncorrect2 = 'Required' } else if (values.uncorrect2.length > 1000) { errors.uncorrect2 = 'Must be 1000 characters or less'}
    if (!values.answerCorrect) { errors.answerCorrect = 'Required'  } else if (values.answerCorrect.length > 1000) { errors.answerCorrect = 'Must be 1000 characters or less'}
    return errors
  }

let AdminEditContributionForm = props => {
  const { handleSubmit, submitting, language, declineFunction, backNavigation } = props;
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
          <table style={{width: "100%"}} class="contributionForm">
              <tbody>
                <tr><td><Field  name="question"   component={SmartTextArea} label={translations.question} value='dsfgsdfgsdfg'/></td></tr>
                <tr><td><br/><br/></td></tr>
                <tr><td><Field  name="uncorrect0"   component={SmartTextArea} label={translations.firstAnswer} /></td></tr>
                <tr><td><Field  name="uncorrect1"   component={SmartTextArea} label={translations.secondAnswer} /></td></tr>
                <tr><td><Field  name="uncorrect2"   component={SmartTextArea} label={translations.thirdAnswer} /></td></tr>
                <tr><td><Field  name="answerCorrect"   component={SmartTextArea} label={translations.fourthAnswer} /></td></tr>
              </tbody>
          </table>
        </div>
        <br/><br/>
        <div>
          <button type="button" className="btn btn-primary" disabled={submitting} onClick={backNavigation}><FormattedMessage id="backToContributionPage" /></button>&nbsp;&nbsp;&nbsp;
          <button type="submit" className="btn btn-primary" disabled={submitting}><FormattedMessage id="approveAndsaveQuestion" /></button>&nbsp;&nbsp;&nbsp;
          <button type="button" className="btn btn-danger" onClick={declineFunction} disabled={submitting}><FormattedMessage id="declineQuestion" /></button>&nbsp;&nbsp;&nbsp;
        </div>
      </form>
    </IntlProvider>
  );
};

AdminEditContributionForm = reduxForm({
  form: 'editContibutionFormAdminRedux', 
  enableReinitialize: true,
  validate,
})(AdminEditContributionForm);

export default AdminEditContributionForm;