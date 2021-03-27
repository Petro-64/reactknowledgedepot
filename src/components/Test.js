import React from 'react'
import TopNavigation from './TopNavigation1';
import Footer from './Footer';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { Link} from 'react-router-dom';
import Countdown from './formelements/Countdown';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Test';
import Modal from './Modal';


const ifToDestroyTemporaryQuestions = 1;
const resultsPageAddrUser = '/app/resultsn';// if this guy registered, sent him to results page
const resultsPageAddrNotUser = '/app';// if this guy not registered, just sent him to home page

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.countdown = React.createRef();
    this.state = {
      currentSubjectId: '',
      currentSubjectName: '',
      currentSubjectId: ''
    }
    this.modall = React.createRef();
  }

  resetAll(){
    this.props.setCurrentSubjectId('');
    this.props.setCurrSubjectNameRedux('');
    this.props.setTestingSessionHash('');
    this.props.setCurrentQuestion('');
    this.props.setAnswers([]);
    this.props.setNumberOfAnswered(0);
    this.props.setNumberOfCorrect(0);
    this.props.setIfRemainQuestions(1)
  }

  componentDidMount() {
    this.props.loadSubjectsUsers();
    this.resetAll();
  }

  componentWillUnmount() {
    this.props.setCurrentPaginationAction(0);
    this.props.destroyTemporaryTestingQuestions(this.props.testingSessionHash, ifToDestroyTemporaryQuestions);
    this.resetAll();
  }

  onDropdownChange = (event) => {
    const subjName = this.props.subjectsUser.filter(value => value.id == event.target.value);
    this.setState({
      currentSubjectId: event.target.value,
      currentSubjectName: subjName
    })
    this.props.setCurrentSubjectId(event.target.value);
    if(subjName[0]){
      this.props.setCurrentSubjectName(subjName[0].name);
    } else {
      this.props.setCurrentSubjectName('');
    }
  };

  answerClicked = (id) => {
    this.countdown.current.resetTimer();
    this.props.processTesting(this.props.testingSessionHash, id, this.props.currentSubjectId);
    let corrAnswerId = ((this.props.correctAnswerId/2) - 456) / 36;
    this.setState({
      currentSubjectId: corrAnswerId,
    })
    this.props.setHintsBorderVisibility(1);
  }

  openModal(){
      this.modall.current.showModal();
  }

  startTestingButtonClicked = () =>{
    this.props.startNewTest(this.state.currentSubjectId, this.props.testingSessionId);
    this.countdown.current.startTimer();
  }

  stopTestingButtonClicked = () =>{
    if(this.props.roleId == 0){// depends is this user registered or not, we redirect him to 'results' or 'home' page
      this.props.history.push(resultsPageAddrNotUser);
    } else {
      this.props.history.push(resultsPageAddrUser);
    }
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  render() {
    const translations = {
      pleaseConfirmTestStop:  this.props.pleaseConfirmTestStop === 'en' ? messages.en.submit : messages.ru.pleaseConfirmTestStop,
    }
     return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <Modal ref={this.modall} toExecute = {this.stopTestingButtonClicked.bind(this)} message={translations.pleaseConfirmTestStop}/>
          <div>
              <TopNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
              <div className="container">
                <h2><FormattedMessage id="tests" /></h2>
                <h5 style={this.state.currentSubjectName === '' ? {display: 'none'} :  {}}>
                  <FormattedMessage id="currentSubject" />: {this.props.currentSubjectName} 
                </h5>
                {/* introductory block starts */}
                <div className="testsIntroduction" style={this.props.currentSubjectId === '' ? {} : {display: 'none'} }>
                    <p>
                      <FormattedMessage id="noRegistrationNeeded" />
                    </p>
                    <p>
                      <FormattedMessage id="ifYouWouldLike" /><Link to="/app/register"><FormattedMessage id="herre" /></Link>
                    </p>
                    <p>
                      <FormattedMessage id="firstt" />
                    </p>
                </div>
                {/* introductory block ends */}

                {/* select subject block starts */}
                <select className="form-control" onChange={this.onDropdownChange} style={this.props.testingSessionHash === '' ?  {} : {display: 'none'}}>
                <FormattedMessage id="select">{(formattedValue)=>(<option key="0" value="">{formattedValue}</option>)}</FormattedMessage>{/* ugly way to get just translated string, but this works */}
                  {
                  this.props.subjectsUser.map((value) => 
                  (<option key={value.id} value={value.id}>{value.name}</option>))
                  }
                </select>
                <br/>
                {/* select subject block ends */}

                {/* start test block starts */}
                <div style={this.props.currentSubjectId === '' ? {display: 'none'} : {}} >
                  <button type="button" className="btn btn-primary" onClick={this.startTestingButtonClicked} style={this.props.testingSessionHash === '' ?  {} : {display: 'none'}}>
                    <FormattedMessage id="startYour" /> {this.props.currentSubjectName} <FormattedMessage id="test" />
                  </button>
                </div>
                {/* start test block ends */}

                {/* main test block starts */}
                <div style={this.props.currentQuestion === '' ? {display: 'none'} : {}} >
                  <table>
                    <tbody>
                      <tr><td><p><FormattedMessage id="answeredQuestions" />: {this.props.numberOfAnsweredQuestions}</p></td></tr>
                      <tr><td><Countdown ref={this.countdown} stopFunction = {this.stopTestingButtonClicked} language={this.props.language} /></td></tr>
                    </tbody>
                  </table>
                  <p>
                    <FormattedMessage id="correctAnswers" />: {this.props.numberOfCorrectQuestions} 
                  </p>
                  <p>
                    <FormattedMessage id="currentQuestion" />: 
                  </p>
                  <p className="qusetionBlock">{this.props.currentQuestion}</p>
                  <FormattedMessage id="justClickCorrectAnswer" />:<br/>
                  {this.props.answers.map((value) => 
                  <div className="answerBlock" style={(this.props.toShowTestingHints === "1" && this.props.toShowTestHintsBorder === 1) ? this.state.currentSubjectId === value.id ? {outline: '2px solid green'} : {outline: '2px solid red'}  : {}} 
                      key={value.id} data-id={value.id} onClick={() => this.answerClicked(value.id)}>{value.name}
                  </div>)}<br/>
                  <button type="button" className="btn btn-danger" onClick={this.openModal.bind(this)} >
                  <FormattedMessage id="clickToStop" />
                  </button>
                </div>
                {/* main test block ends */}

                {/* results block starts */}
                <div style={this.props.ifRemainQuestions === 1 ? {display: 'none'} : {}}>
                  <p><FormattedMessage id="allQuestionAreAnswered" />:</p>
                  <p><FormattedMessage id="answeredQuestions" />: {this.props.numberOfAnsweredQuestions} </p>  
                  <p><FormattedMessage id="correctAnswers" />: {this.props.numberOfCorrectQuestions} </p>
                  <button type="button" className="btn btn-success" onClick={this.stopTestingButtonClicked} ><FormattedMessage id="doneThanks" /></button>
                </div>
                {/* results block ends */}

              </div>
          </div>  
          <Footer logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
     </IntlProvider>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.testReducer, ...state.loginSignUpReducer, ...state.subjectsReducer, ...state.resultsReducer, ...state.settingsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(Test);