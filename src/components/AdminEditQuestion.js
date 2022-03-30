import React from 'react';
import '../App.css';
import MaterialUiNavigation from './MaterialUiNavigation';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Questions';
import AdminEditQuestionForm from "./forms/AdminEditQuestionForm";
import Modal from './formelements/Modal';
import { formValueSelector } from 'redux-form';


class AdminEditQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      currentSubjectId: '',
      currentSubjectName: '',
      isThisTheLastQuestionForGivenSubject: false,
      isThisTheFirstQuestionForGivenSubject: false,
      nextQuestionId: '',
      prevQuestionId: '',
      currentQuestionId: '',
    }
    this.modall = React.createRef();
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  componentDidUpdate(){
    if(this.props.redirectAfterSuccesfullQuestionsSaving === 2){/// this means that user came from email confirmation link
      this.props.history.push('/app/admineditquestion');
    };
  }

  componentDidMount(){
    ///////////////////////////////////////////////// for next question functionality
    this.props.loadQuestionsAndAnswersToEditAdmin(this.props.match.params.id);
    this.setState({
      currentQuestionId: this.props.match.params.id,
    })
    let questionsFiltered = this.props.questions.filter (question => question.id > this.props.match.params.id);//to determine if this is the last question for this subject ordered by id
    if(questionsFiltered.length > 0){
      this.setState({
        isThisTheLastQuestionForGivenSubject: true,
        nextQuestionId: questionsFiltered[0].id,
      })
    }
    ///////////////////////////////////////////////// for prev question functionality
    let questionsFilteredPrev = this.props.questions.filter(question => question.id < this.props.match.params.id).sort(function (a, b){
      if(a.id > b.id) return -1;
      if(a.id < b.id) return 1;
      return 0;
    });//to determine if this is the first question for this subject ordered by id
    if(questionsFilteredPrev.length > 0){
      this.setState({
        isThisTheFirstQuestionForGivenSubject: true,
        prevQuestionId: questionsFilteredPrev[0].id,
      })
    }
  }

  loadNextQuestion(){
    let editedValues = {
      question: this.props.questionFromForm,
      subjectId: this.props.adminEditQuestionItem.subjectId,
      questionId: this.props.adminEditQuestionItem.questionId,
      answerCorrect: this.props.fourthAnswerFromForm,
      correctId: this.props.adminEditQuestionItem.correctId,
      uncorrect0: this.props.firstAnswerFromForm,
      uncorrect1: this.props.secondAnswerFromForm,
      uncorrect2: this.props.thirdAnswerFromForm,
      uncorrectId0: this.props.adminEditQuestionItem.uncorrectId0,
      uncorrectId1: this.props.adminEditQuestionItem.uncorrectId1,
      uncorrectId2: this.props.adminEditQuestionItem.uncorrectId2,
      ifNeedToRedirect: false
    }
    this.props.editQuestionsSaga({editedValues})
    this.props.loadQuestionsAndAnswersToEditAdmin(this.state.nextQuestionId);
    let questionsFiltered = this.props.questions.filter (question => question.id > this.state.nextQuestionId);//to determine if this is the last question for this subject ordered by id
    if(questionsFiltered.length > 0){
      this.setState({
        isThisTheLastQuestionForGivenSubject: true,
        currentQuestionId: this.state.nextQuestionId,
        nextQuestionId: questionsFiltered[0].id,
      })
    } else {
      this.setState({
        currentQuestionId: this.state.nextQuestionId,
        isThisTheLastQuestionForGivenSubject: false,
      })
    }
///////////////////
    let questionsFilteredPrev = this.props.questions.filter(question => question.id < this.state.nextQuestionId).sort(function (a, b){
      if(a.id > b.id) return -1;
      if(a.id < b.id) return 1;
      return 0;
    });//to determine if this is the first question for this subject ordered by id
    
  if(questionsFilteredPrev.length > 0){
        this.setState({
          isThisTheFirstQuestionForGivenSubject: true,
          prevQuestionId: questionsFilteredPrev[0].id,
        })
      } 
  }

  loadPrevQuestion(){
    let editedValues = {
      question: this.props.questionFromForm,
      subjectId: this.props.adminEditQuestionItem.subjectId,
      questionId: this.props.adminEditQuestionItem.questionId,
      answerCorrect: this.props.fourthAnswerFromForm,
      correctId: this.props.adminEditQuestionItem.correctId,
      uncorrect0: this.props.firstAnswerFromForm,
      uncorrect1: this.props.secondAnswerFromForm,
      uncorrect2: this.props.thirdAnswerFromForm,
      uncorrectId0: this.props.adminEditQuestionItem.uncorrectId0,
      uncorrectId1: this.props.adminEditQuestionItem.uncorrectId1,
      uncorrectId2: this.props.adminEditQuestionItem.uncorrectId2,
      ifNeedToRedirect: false
    }
    this.props.editQuestionsSaga({editedValues})
    this.props.loadQuestionsAndAnswersToEditAdmin(this.state.prevQuestionId);
    let questionsFilteredPrev = this.props.questions.filter(question => question.id < this.state.prevQuestionId).sort(function (a, b){
      if(a.id > b.id) return -1;
      if(a.id < b.id) return 1;
      return 0;
    });//to determine if this is the first question for this subject ordered by id
    if(questionsFilteredPrev.length > 0){
      this.setState({
        isThisTheFirstQuestionForGivenSubject: true,
        currentQuestionId: this.state.prevQuestionId,
        prevQuestionId: questionsFilteredPrev[0].id,
      })
    } else {
      this.setState({
        currentQuestionId: this.state.prevQuestionId,
        isThisTheFirstQuestionForGivenSubject: false,
      })
    }
    /////
    let questionsFilteredNext = this.props.questions.filter (question => question.id > this.state.prevQuestionId);//to determine if this is the last question for this subject ordered by id
    if(questionsFilteredNext.length > 0){
      this.setState({
        nextQuestionId: questionsFilteredNext[0].id,
        isThisTheLastQuestionForGivenSubject: true,
      })
    }   
  }

  showModal(){
    console.log("show modal");
    this.modall.current.showModal();
  }
  
  deleteQuestion(){
    this.props.deleteQuestion(true);
  }

  backNavigation(){
    this.props.history.push('/app/admineditquestion');
  }

  render() {
    let initialValues={// this way of assignment looks weird, but otherwise, if simpler, it gives error
      question: this.props.adminEditQuestionItem.question,
      subjectId: this.props.adminEditQuestionItem.subjectId,
      questionId: this.props.adminEditQuestionItem.questionId,
      answerCorrect: this.props.adminEditQuestionItem.answerCorrect,
      correctId: this.props.adminEditQuestionItem.correctId,
      uncorrect0: this.props.adminEditQuestionItem.uncorrect0,
      uncorrect1: this.props.adminEditQuestionItem.uncorrect1,
      uncorrect2: this.props.adminEditQuestionItem.uncorrect2,
      uncorrectId0: this.props.adminEditQuestionItem.uncorrectId0,
      uncorrectId1: this.props.adminEditQuestionItem.uncorrectId1,
      uncorrectId2: this.props.adminEditQuestionItem.uncorrectId2
    }

    let editedValues = {
      question: this.props.questionFromForm,
      subjectId: this.props.adminEditQuestionItem.subjectId,
      questionId: this.props.adminEditQuestionItem.questionId,
      answerCorrect: this.props.fourthAnswerFromForm,
      correctId: this.props.adminEditQuestionItem.correctId,
      uncorrect0: this.props.firstAnswerFromForm,
      uncorrect1: this.props.secondAnswerFromForm,
      uncorrect2: this.props.thirdAnswerFromForm,
      uncorrectId0: this.props.adminEditQuestionItem.uncorrectId0,
      uncorrectId1: this.props.adminEditQuestionItem.uncorrectId1,
      uncorrectId2: this.props.adminEditQuestionItem.uncorrectId2,
      ifNeedToRedirect: true
    }

    return (
      
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
      <div>
          <Modal ref={this.modall}  message={'Please confirm question deletion'} toExecute = {this.deleteQuestion.bind(this)}/>
          <MaterialUiNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
          <div className="container">
            <h2><FormattedMessage id="editQuestion" /> # {this.state.currentQuestionId} </h2>
            <h4><FormattedMessage id="subject" />:&nbsp;{this.props.currentSubjectName}</h4>
              <AdminEditQuestionForm  
              onSubmit={()=>{this.props.editQuestionsSaga({editedValues})}} 
              language={this.props.language} 
              declineFunction={this.props.declineContributionAdmin} 
              initialValues={initialValues} 
              backNavigation={this.backNavigation.bind(this)} 
              nextIsAvailable={this.state.isThisTheLastQuestionForGivenSubject} 
              prevIsAvailable={this.state.isThisTheFirstQuestionForGivenSubject}
              loadnextQuestion={this.loadNextQuestion.bind(this)} 
              loadPrevQuestion={this.loadPrevQuestion.bind(this)}
              showModal={this.showModal.bind(this)}
            />
          </div>
      </div> 
     </IntlProvider>  
    )
  }
}

const selector = formValueSelector('editContibutionFormAdminRedux');

AdminEditQuestion = connect(
  state => {
    const questionFromForm = selector(state, 'question');
    const firstAnswerFromForm = selector(state, 'uncorrect0');
    const secondAnswerFromForm = selector(state, 'uncorrect1');
    const thirdAnswerFromForm = selector(state, 'uncorrect2');
    const fourthAnswerFromForm = selector(state, 'answerCorrect');
    return {
      questionFromForm, firstAnswerFromForm, secondAnswerFromForm, thirdAnswerFromForm, fourthAnswerFromForm
    }
  }
)(AdminEditQuestion) 


const mapStateToProps=(state)=>{
  return {
    ...state.testReducer, ...state.usersReducer, ...state.loginSignUpReducer, ...state.settingsReducer,  ...state.questionsReducer, ...state.subjectsReducer,  ...state.resultsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(AdminEditQuestion);