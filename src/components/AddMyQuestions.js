import React from 'react'
import MaterialUiNavigation from './MaterialUiNavigation';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Contribution';
import { withCookies } from 'react-cookie';
import AddContributionForm from "./forms/AddContributionForm";
import { formValueSelector } from 'redux-form';
import MuiDropDownMenu from './formelements/MuiDropDownMenu';

class AddMyQuestions extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
        currentSubjectId: '',
        currentSubjectName: '',
    };
  }

  componentDidMount(){
    this.props.setCurrentContributionSubjectId('');
    this.props.loadSubjectsUsers();
  }

  onDropdownChange = (event) => {
    const subjName = this.props.subjectsUser.filter(value => value.id == event.target.value);
    this.setState({
      currentSubjectId: event.target.value,
      currentSubjectName: subjName
    })
    this.props.setCurrentContributionSubjectId(event.target.value);
    if(subjName[0]){
      this.props.setCurrentContributionSubjectname(subjName[0].name);
    } else {
      this.props.setCurrentContributionSubjectname('');
    }
  };

  onMuiDropdownChange = (id, name) => {
    const subjName = name;
    this.setState({
      currentSubjectId: id,
      currentSubjectName: name
    })
    this.props.setCurrentContributionSubjectId(id);
    if(!!name){
      this.props.setCurrentContributionSubjectname(name);
    } else {
      this.props.setCurrentContributionSubjectname('');
    }
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  navigateToMyContributionStatus = () =>{
    this.props.history.push('/app/myquestionstatus');
  }


  render() {
    const { question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer } = this.props;
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <div>
          <MaterialUiNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} 
            roleId={this.props.roleId} 
            toggleLanguage={this.toggleLanguage} 
            language={this.props.language} 
            />
           <div className="container">
            <h2><FormattedMessage id="addMyQuestions" /></h2>
            <br />
            <FormattedMessage id="youCanAddQuestions" />
            <br />
            <MuiDropDownMenu options={this.props.subjectsUser} onMuiDropdownChange={this.onMuiDropdownChange} language={this.props.language} messages={messages}/>
            {/*
            <select className="form-control" onChange={this.onDropdownChange}>
                <FormattedMessage id="select">{(formattedValue)=>(<option key="0" value="">{formattedValue}</option>)}</FormattedMessage> ugly way to get just translated string, but this works 
                {this.props.subjectsUser.map((value) => (<option key={value.id} value={value.id}>{value.name}</option>)) } </select> */}
            <div style={this.props.contributionSubjectId === '' ? {display: 'none'} : {}} >
              <AddContributionForm onSubmit={()=>{this.props.sentMyContributionSaga({ question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId: this.props.contributionSubjectId })}} 
              navigateFunction = {this.navigateToMyContributionStatus.bind(this)} language={this.props.language}/>
            </div>
          </div>
        </div>
     </IntlProvider>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.loginSignUpReducer, ...state.settingsReducer, ...state.subjectsReducer, ...state.testReducer, ...state.contributionsReducer
  };
}

const selector = formValueSelector('addContibutionFormRedux');

AddMyQuestions = connect(
  state => {
    const question = selector(state, 'question');
    const firstAnswer = selector(state, 'firstAnswer');
    const secondAnswer = selector(state, 'secondAnswer');
    const thirdAnswer = selector(state, 'thirdAnswer');
    const fourthAnswer = selector(state, 'fourthAnswer');
    return {
      question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer
    }
  }
)(AddMyQuestions) 

export default connect(mapStateToProps, actionCreators)(withCookies(AddMyQuestions));