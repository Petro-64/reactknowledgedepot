import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/SearchForQuestions';
import * as actionCreators from '../../actions/index';
import {connect} from 'react-redux';
import { Observable, Subject, map, debounceTime, distinctUntilChanged, filter, tap } from "rxjs";
import {useEffect} from 'react';
import { data } from 'jquery';



const SearchQuestionByTypeAhead = props => {
  const { handleSubmit, pristine, reset, submitting, language } = props;

//let obs = new Observable.fromEvent();
const textChange = new Subject;
const subscription = textChange.asObservable().pipe(
        map((data) => data),
        filter(data => data.length > 3),
        debounceTime(2000),
        distinctUntilChanged(),
    ).subscribe(
        (data) => {
            props.searchQuestionByTypeAhead(data)
        } 
    )


  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
          <FormattedMessage id="keyword">
            {(formattedValue)=>(<Field 
            name="questionsearchtypeahead"
            autoComplete="off" 
            component="input" 
            type="text" 
            placeholder={formattedValue}
            onChange={(e) => {
                textChange.next(e.target.value)
              }}
            />)}
          </FormattedMessage>
          &nbsp;&nbsp;just start typing, works from 4 chars length
          </div>
        </div>
      </form>
    </IntlProvider>
  );
};

const mapStateToProps=(state)=>{
    return {
      ...state.testReducer, ...state.loginSignUpReducer, ...state.subjectsReducer, ...state.settingsReducer, ...state.questionsReducer
    };
  }

export default reduxForm({
  form: 'SearchQuestionTypeAhead', // a unique identifier for this form
})(connect(mapStateToProps, actionCreators)(SearchQuestionByTypeAhead));

//export default connect(mapStateToProps, actionCreators)(SearchQuestionByTypeAhead);