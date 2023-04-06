import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/SearchForQuestions';


const SearchQuestionByKeyWord = props => {
  const { handleSubmit, pristine, reset, submitting, language } = props;
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
          <FormattedMessage id="keyword">
            {(formattedValue)=>(<Field name="questionsearchkeyword" component="input" type="text" placeholder={formattedValue}/>)}
          </FormattedMessage>
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}><FormattedMessage id="search" /></button>
          <button type="button" disabled={pristine || submitting} onClick={reset}><FormattedMessage id="clearVal" /></button>
        </div>
      </form>
    </IntlProvider>
  );
};

export default reduxForm({
  form: 'SearchQuestionByKeyWord', // a unique identifier for this form
})(SearchQuestionByKeyWord);