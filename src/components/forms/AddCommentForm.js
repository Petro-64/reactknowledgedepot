import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/forms/AddContributionForm';
import SmartTextArea from '../formelements/SmartTextArea';

let validate = values => {
    const errors = {}
    if (!values.comment) {  errors.comment = 'Required'  } else if (values.comment.length > 200) { errors.comment = 'Must be 200 characters or less'}
    return errors
  }

let AddCommentForm = props => {
  const { handleSubmit, pristine, reset, submitting, language, valid, cancell } = props;
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <form onSubmit={handleSubmit}>
          <br/> <br />
        <div>
            <table style={{width: "100%"}} className="contributionForm">
                <tbody>
                  <tr><td><Field  name="comment"   component={SmartTextArea} /></td></tr>
                </tbody>
            </table>
            <button type="button" className="btn btn-danger" onClick={cancell}>Cancel</button>
            <button type="submit" className="btn btn-success" onClick={cancell} disabled={pristine || submitting || !valid}><FormattedMessage id="sendFeedback" /></button>
            <button type="button" className="btn btn-danger" onClick={reset}>reset</button>
        </div>
        <br/><br/>
      </form>
    </IntlProvider>
  );
};

AddCommentForm = reduxForm({
  form: 'addCommentFormRedux', 
  validate
})(AddCommentForm);

export default AddCommentForm;