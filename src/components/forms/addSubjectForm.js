import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/AddSubjForm';

const AddSubjectForm = props => {
  const { handleSubmit, pristine, reset, submitting, language } = props;
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
          <FormattedMessage id="subject">
            {(formattedValue)=>(<Field name="subject" component="input" type="text" placeholder={formattedValue}/>)}
          </FormattedMessage>
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}><FormattedMessage id="submit" /></button>
          <button type="button" disabled={pristine || submitting} onClick={reset}><FormattedMessage id="clearVal" /></button>
        </div>
      </form>
    </IntlProvider>
  );
};

export default reduxForm({
  form: 'addSubjectForm', // a unique identifier for this form
})(AddSubjectForm);