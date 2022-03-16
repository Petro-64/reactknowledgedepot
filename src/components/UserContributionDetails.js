import React from 'react'
import MaterialUiNavigation from './MaterialUiNavigation';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/AdminContribution';
import UserEditContributionForm from "./forms/UserEditContributionForm";
import StyledUserContributionItem from '../styled/StyledUserContributionItem'


class UserContributionDetails extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  componentDidMount(){
    this.props.loadContributionItemUser(this.props.match.params.id);
  }

  componentDidUpdate(){}
 
  backNavigation(){
    this.props.history.push('/app/myquestionstatus');
  }

  handleChange = (e) =>{
    this.setState({question: e.target.value});
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  render() {
    let { questionStatus, createdAt, subjectId } = this.props.userContributionItem;
    ////console.log("subjectId = ", subjectId);
    let subjectName = this.props.subjectsUser.filter((e) => e.id === subjectId);
    let subjName;
    if(!!subjectName[0]){
      subjName = subjectName[0]['name'];
    }

    let statusWord = questionStatus == 0 ? messages[this.props.language].pending : questionStatus == '1' ? messages[this.props.language].approved : messages[this.props.language].declined;
    return (
      <StyledUserContributionItem >
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <div>
            <MaterialUiNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
            <div className="container">
              <h2><FormattedMessage id="myConrtibutionDetails" /></h2>
              <h4 style={questionStatus == '0' ? {backgroundColor: '#efe756'} : questionStatus == '1' ? {backgroundColor: '#9dd49b', color: 'white !important'} : {backgroundColor: '#efc9c9', color: 'white !important'}}>
                <FormattedMessage id="status" />: {statusWord}
              </h4>&nbsp;&nbsp;
              <h4>
                <FormattedMessage id="subject" />: {subjName}
              </h4>
              <h4 className="second"><FormattedMessage id="creationDate" />: {createdAt}
              </h4>
              <UserEditContributionForm  language={this.props.language}  initialValues={this.props.userContributionItem}   backNavigation={this.backNavigation.bind(this)} />
            </div>
        </div> 
      </IntlProvider>
     </StyledUserContributionItem>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.loginSignUpReducer, ...state.settingsReducer, ...state.contributionsReducer, ...state.usersReducer, ...state.subjectsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(UserContributionDetails);