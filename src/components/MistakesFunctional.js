import React, { useReducer, useState, memo , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import messages from '../translations/Mistakes';
import { IntlProvider, FormattedMessage } from "react-intl";
import {connect} from 'react-redux';
import settingsReducer from '../reducers/settings';
import MaterialUiNavigation from './MaterialUiNavigation';
import MuiDropDownMenu from './formelements/MuiDropDownMenu';
import BootstrapTable from 'react-bootstrap-table-next';
import { CLEAR_SENSITIVE_INFO, SET_FLASH_MESSAGES_VISIBILITY, SET_FLASH_MESSAGES_MESSAGE, SET_FLASH_MESSAGES_TYPE, SET_LANGUAGE, SET_GLOBAL_SETTINGS, 
  SET_COOKIE_CONSENT_VISIBILITY, SET_COOKIE_CONSENT_OBTAINED } from '../types';


const MistakesFunctional = (props) => {
    const dispatch = useDispatch();
    const toggleLanguage = (lang) =>{
      dispatch({ type: SET_LANGUAGE, lang: lang  })
    }

    const getMistakes = () => {
      dispatch({ type: 'GET_MISTAKES'})
    }

    const setCurrentMistakesSubjectIdDispatch = (id) => {
      dispatch({ type: 'SET_CURRENT_MISTAKES_SUBJECT_ID',  id: id})
    }

    const setCurrentMistakesSubjectName = (name) => {
      dispatch({ type: 'SET_CURRENT_MISTAKES_SUBJECT_NAME', name: name })
    };

    const onMuiDropdownChange = (id, name) => {
      dispatch({ type: 'SET_CURRENT_MISTAKES_SUBJECT_ID',  id: id})
      if(!!name){
        dispatch({ type: 'SET_CURRENT_MISTAKES_SUBJECT_NAME', name: name })
      } else {
        dispatch({ type: 'SET_CURRENT_MISTAKES_SUBJECT_NAME', name: '' })
      }
  
      dispatch({
            type: 'SET_MISTAKES_FILTERED',
            mistakesFiltered: props.mistakes.filter(value => value.name == name)})
    }

    const columns = props.currentSubjectIdMistakes == '' ? [{
      dataField: 'name',
      text:  props.language === 'en' ? messages.en.subjName : messages.ru.subjName,
      sort: true,
    }, {
      dataField: 'questionId',
      text:  props.language === 'en' ? messages.en.questionId : messages.ru.questionId,
      sort: true,
    }, {
      dataField: 'question',
      text: props.language === 'en' ? messages.en.question : messages.ru.question,
      sort: false
    }, {
      dataField: 'countt',
      text: props.language === 'en' ? messages.en.numbMistakes : messages.ru.numbMistakes,
      sort: true
    }

   ] : [{
    dataField: 'questionId',
    text:  props.language === 'en' ? messages.en.questionId : messages.ru.questionId,
    sort: true,
  }, {
    dataField: 'question',
    text: props.language === 'en' ? messages.en.question : messages.ru.question,
    sort: false
  }, {
    dataField: 'countt',
    text: props.language === 'en' ? messages.en.numbMistakes : messages.ru.numbMistakes,
    sort: true
  }

 ];


    useEffect(() => {
      getMistakes();
      setCurrentMistakesSubjectIdDispatch('');
      setCurrentMistakesSubjectName('');
    }, []);

    console.log(props);

     return (
      <div>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <MaterialUiNavigation logoutUser={props.logoutUser} 
          userName={props.userName} 
          roleId={props.roleId} toggleLanguage={toggleLanguage} language={props.language}/>
          <div className="container">
            <h2><FormattedMessage id="mistakes" /></h2>
            <MuiDropDownMenu options={props.subjectsUser} 
                onMuiDropdownChange={onMuiDropdownChange} 
                language={props.language} 
                messages={messages} 
                visibility={true}  
                selectedSubj = {props.currentSubjectIdMistakes}/><br/><br/><br/>
                <BootstrapTable keyField='id' data={ props.mistakesFiltered } columns={ columns }/>

          </div>
        </IntlProvider>
      </div>
    );
}


  const mapStateToProps=(state)=>{
    return {
      ...state.testReducer, ...state.loginSignUpReducer, ...state.subjectsReducer, ...state.settingsReducer, ...state.mistakesReducer
    };
  }

export default connect(mapStateToProps)(MistakesFunctional);////, mapDispatchToProps