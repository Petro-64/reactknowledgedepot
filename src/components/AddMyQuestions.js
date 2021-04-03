import React from 'react'
import TopNavigation from './TopNavigation';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Contribution';
import { withCookies } from 'react-cookie';
import Footer from './Footer';
import AddContributionForm from "./forms/AddContributionForm";


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

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <div>
          <TopNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
          <div className="container">
            <h2><FormattedMessage id="addMyQuestions" /></h2>
            <br />
            <FormattedMessage id="youCanAddQuestions" />
            <br /><br />
            <select className="form-control" onChange={this.onDropdownChange}>
                <FormattedMessage id="select">{(formattedValue)=>(<option key="0" value="">{formattedValue}</option>)}</FormattedMessage>{/* ugly way to get just translated string, but this works */}
                {this.props.subjectsUser.map((value) => (<option key={value.id} value={value.id}>{value.name}</option>)) }
            </select>
            <div style={this.props.contributionSubjectId === '' ? {display: 'none'} : {}} >
              <AddContributionForm onSubmit={()=>{this.props.sentMyContribution()}} language={this.props.language}/>
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
    ...state.loginSignUpReducer, ...state.settingsReducer, ...state.subjectsReducer, ...state.testReducer, ...state.contributionsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(withCookies(AddMyQuestions));