import React from 'react';
import '../App.css';
import TopNavigation from './TopNavigation';
import Footer from './Footer';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Questions';
import 'react-accessible-accordion/dist/fancy-example.css';
import AdminEditContributionForm from "./forms/AdminEditContributionForm";

class AdminAddQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
        currentSubjectId: '',
        currentSubjectName: '',
      }
  }

  componentDidMount(){
    this.props.loadSubjectsAdmin();
  }

  onDropdownChange = (event) => {
    const subjName = this.props.subjectsAdmin.filter(value => value.id == event.target.value);

    if(event.target.value != 0){
        this.setState({
            currentSubjectId: event.target.value,
            currentSubjectName: subjName[0].name
          })
    } else {
        this.setState({
            currentSubjectId: event.target.value,
            currentSubjectName: ''
          })
    }
    this.props.setCurrentSubjectIdToAddQuestion(event.target.value);
  };

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
      <div>
          <TopNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
          <div className="container">
            <h2><FormattedMessage id="addQuestion" /></h2>
            <p style={this.state.currentSubjectName === ''  ? {} : {display: 'none'}}><FormattedMessage id="firstt" /></p>
            <p style={this.state.currentSubjectName === ''  ? {display: 'none'} : {}}><FormattedMessage id="currentSubject" />&nbsp;{this.state.currentSubjectName}</p>
            <select className="form-control" onChange={this.onDropdownChange}>
            <FormattedMessage id="select">{(formattedValue)=>(<option key="0" value="0">{formattedValue}</option>)}</FormattedMessage>{/* ugly way to get just translated string, but this works */}
                {
                this.props.subjectsAdmin.map((value) => 
                (<option key={value.id} value={value.id}>{value.name}</option>))
                }
            </select>
            <br/>
            <div style={this.state.currentSubjectName === ''  ? {display: 'none'} : {}}>
            <AdminEditContributionForm  onSubmit={()=>{this.props.addNewQuestionAdmin()}} language={this.props.language}  showAllButtons={false} />
            </div>
          </div>
      </div> 
      <Footer logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
     </IntlProvider>  
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.testReducer, ...state.usersReducer, ...state.loginSignUpReducer, ...state.settingsReducer, ...state.questionsReducer, ...state.subjectsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(AdminAddQuestions);