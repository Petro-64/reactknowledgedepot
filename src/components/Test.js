import React from 'react'
import MaterialUiNavigation from './MaterialUiNavigation';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { Link} from 'react-router-dom';
import Countdown from './formelements/Countdown';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Test';
import ModalMUI from './formelements/ModalMUI';
import StyledTesting from '../styled/StyledTesting';
import Button from '@mui/material/Button';
import MuiDropDownMenu from './formelements/MuiDropDownMenu';
import $ from 'jquery';

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
      currentSubjectName: ''
    }
    this.modall = React.createRef();
  }

  jqueryClickEmulation = () =>{
    $('.container').trigger('click');// for Iphone there is a bug when shadow stays on answer div after page reloaded
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
    this.jqueryClickEmulation();
  }

  componentDidUpdate(){
    this.jqueryClickEmulation();
  }


  componentWillUnmount() {
    this.props.setCurrentPaginationAction(0);
    this.props.destroyTemporaryTestingQuestions(this.props.testingSessionHash, ifToDestroyTemporaryQuestions);
    this.resetAll();
  }

  onDropdownChange = (event) => {
    const subjName = this.props.subjectsUser.filter(value => value.id === event.target.value);
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

  onMuiDropdownChange = (id, name) => {
    this.setState({
      currentSubjectId: id,
      currentSubjectName: name
    })
    this.props.setCurrentSubjectId(id);
    if(!!name){
      this.props.setCurrentSubjectName(name);
    } else {
       this.props.setCurrentSubjectName('');
    }
  }

  answerClicked = (id) => {
    this.props.setOverlayVisibility(true);
    setTimeout(
      () => {
        this.countdown.current.resetTimer();
        this.props.processTesting(this.props.testingSessionHash, id, this.props.currentSubjectId);
        let corrAnswerId = ((this.props.correctAnswerId/2) - 456) / 36;
        this.setState({
          currentSubjectId: corrAnswerId,
        })
        this.props.setHintsBorderVisibility(1);
      }, 1000

    )

  }

  openModal(){
      this.modall.current.showModal();
  }

  startTestingButtonClicked = () =>{
    this.props.startNewTest(this.state.currentSubjectId, this.props.testingSessionId);
    this.countdown.current.startTimer();
  }

  stopTestingButtonClicked = () =>{
    this.props.setRemainingQuestionsToZero();
  }

  navigateOutFromTestingPage = () =>{
    if(this.props.roleId === 0){// depends is this user registered or not, we redirect him to 'results' or 'home' page
      this.props.history.push(resultsPageAddrNotUser);
    } else {
      this.props.history.push(resultsPageAddrUser);
    }
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  render() {
    const visibility = this.props.testingSessionHash === '' ?  '' : 'none';

     return (
      <StyledTesting>
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
            <ModalMUI ref={this.modall} toExecute = {this.stopTestingButtonClicked.bind(this)} messages={messages[this.props.language]}/>
            <div>
              <MaterialUiNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
              <div className="container">
                <h2 className="testsHeader"><FormattedMessage id="tests" /></h2>
                <h5 style={this.state.currentSubjectName === '' ? {display: 'none'} :  {}}>
                  <FormattedMessage id="currentSubject" />: {this.props.currentSubjectName} 
                </h5>
                {/* introductory block starts */}
                <div className="testsIntroduction" style={this.props.currentSubjectId === '' ? {} : {display: 'none'} }>
                    <p style={this.props.userName === '' ? {} : { display: 'none' } } >
                      <FormattedMessage id="noRegistrationNeeded" />
                    </p>
                    <p style={this.props.userName === '' ? {} : { display: 'none' } } >
                      <FormattedMessage id="ifYouWouldLike" /><Link to="/app/signup"><FormattedMessage id="herre" /></Link>
                    </p>
                    <p>
                      <FormattedMessage id="firstt" />
                    </p>
                </div>
                {/* introductory block ends */}

                {/* select subject block starts */}
                <MuiDropDownMenu options={this.props.subjectsUser} onMuiDropdownChange={this.onMuiDropdownChange} language={this.props.language} messages={messages} visibility={visibility}/>
                <br/>
                {/* select subject block ends */}

                {/* start test block starts */}
                <div style={this.props.currentSubjectId === '' ? {display: 'none'} : {}} >
                  <Button variant="contained"  onClick={this.startTestingButtonClicked} style={this.props.testingSessionHash === '' ?  {} : {display: 'none'}}>
                    <FormattedMessage id="startYour" /> {this.props.currentSubjectName} <FormattedMessage id="test" />
                  </Button>
                </div>
                {/* start test block ends */}

                {/* main test block starts */}
                <div className="testingInfo" style={this.props.currentQuestion === '' ? {display: 'none'} : {}} >
                  <table>
                    <tbody>
                      <tr>
                          <td><FormattedMessage id="answeredQuestions" />: {this.props.numberOfAnsweredQuestions}&nbsp;</td>
                          <td><Countdown ref={this.countdown} stopFunction = {this.stopTestingButtonClicked} language={this.props.language} /></td>
                      </tr>
                      <tr><td><FormattedMessage id="correctAnswers" />: {this.props.numberOfCorrectQuestions}</td><td></td></tr>
                    </tbody>
                  </table>
                  <br/>
                  <p>
                    <FormattedMessage id="currentQuestion" />: 
                  </p>
                  <p className="qusetionBlock">{this.props.currentQuestion}</p>
                  <FormattedMessage id="justClickCorrectAnswer" />:<br/>
                  {this.props.answers.map((value) => 
                  <div className="answerBlock" title="Just click correct answer" style={(this.props.toShowTestingHints === "1" && this.props.toShowTestHintsBorder === 1) ? this.state.currentSubjectId === value.id ? {outline: '2px solid green'} : {outline: '2px solid red'}  : {}} 
                      key={value.id} data-id={value.id} onClick={() => this.answerClicked(value.id)}>{value.name}
                  </div>)}<br/><br/>
                  <Button variant="contained" color="error" onClick={this.openModal.bind(this)}><FormattedMessage id="clickToStop" /></Button>
                </div>
                {/* main test block ends */}

                {/* results block starts */}
                <div style={this.props.ifRemainQuestions === 1 ? {display: 'none'} : {}}>
                  <p><FormattedMessage id="allQuestionAreAnswered" />:</p>
                  <p><FormattedMessage id="answeredQuestions" />: {this.props.numberOfAnsweredQuestions} </p>  
                  <p><FormattedMessage id="correctAnswers" />: {this.props.numberOfCorrectQuestions} </p>
                  <Button variant="contained"  onClick={this.navigateOutFromTestingPage}><FormattedMessage id="doneThanks" /></Button>
                </div>
                {/* results block ends */}

              </div>
            </div>  
      </IntlProvider>
     </StyledTesting>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.testReducer, ...state.loginSignUpReducer, ...state.subjectsReducer, ...state.resultsReducer, ...state.settingsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(Test);