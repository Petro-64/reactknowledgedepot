import React, {  useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import messages from '../translations/Mistakes';
import { IntlProvider, FormattedMessage } from "react-intl";
import {connect} from 'react-redux';
import MaterialUiNavigation from './MaterialUiNavigation';
import MuiDropDownMenu from './formelements/MuiDropDownMenu';
import EditMistakeForm from '../components/forms/EditMistakesForm';
import BootstrapTable from 'react-bootstrap-table-next';
import { SET_LANGUAGE } from '../types';


const MistakesFunctional = (props) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(20);
    const [mistakesCut, setMistakesCut] = useState([]);
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

    const increment = () => {
      setCount((count) => count + 10);
    }

    const handleScroll = (event) =>{
      let gapp = document.scrollingElement.offsetHeight - event.currentTarget.innerHeight - event.currentTarget.scrollY;
      if(gapp < 40){
        increment();
      }
    }

    const deleteMistake = (questionId)=> {
      dispatch({ type: 'DELETE_MISTAKE',  questionId: questionId.id})
    }

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


        dispatch({
          type: 'SET_MISTAKES_CUT',
          mistakesCut: props.mistakes.filter(value => value.name == name).slice(0, 20)})
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
      }] : [{
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
      window.addEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
      dispatch({
        type: 'SET_MISTAKES_CUT',
        mistakesCut: props.mistakesFiltered.slice(0, count)})
    }, [count]);


    useEffect( () => () => window.removeEventListener('scroll', handleScroll), [] );

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
                {/* <BootstrapTable keyField='id' data={ props.mistakesCut } columns={ columns }/> */}
                <EditMistakeForm 
                language={ props.language }
                mistakesCut = { props.mistakesCut }
                deleteMistake = {deleteMistake}
                />
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