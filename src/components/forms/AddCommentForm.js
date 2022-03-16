import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/forms/AddCommentForm';
import {connect} from 'react-redux';
import Button from '@mui/material/Button';
import TextAreaCounterPeter from '../formelements/TextAreaCounterPeter';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

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
        <div>
            <table style={{width: "100%"}} className="contributionForm">
                <tbody>
                  <tr><td><Field  name="comment" component={TextAreaCounterPeter} limit={200} label={messages[language].howAreWeDoing}  language={language}/></td></tr>
                </tbody>
            </table>
            <Button type="submit" variant="contained"  onClick={cancell} disabled={!valid || pristine || submitting}>
              <SendIcon />
            </Button>&nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="error" disabled={pristine || submitting} onClick={reset}>
              <CancelIcon />
            </Button>
        </div>
      </form>
    </IntlProvider>
  );
};

const mapStateToProps=(state)=>{
  return {
      ...state.commentsReducer, ...state.loginSignUpReducer, ...state.settingsReducer
  };
}

AddCommentForm = reduxForm({
  form: 'addCommentFormRedux', 
  validate
})(AddCommentForm);

export default connect(mapStateToProps)(AddCommentForm);
