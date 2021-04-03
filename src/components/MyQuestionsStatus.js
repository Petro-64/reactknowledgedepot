import React from 'react'
import TopNavigation from './TopNavigation';
import Footer from './Footer';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Contribution';
import { withCookies } from 'react-cookie';
import MyContributionStatus from "./forms/MyContributionStatus";

class MyQuestionsStatus extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  componentDidMount(){
    this.props.loadContributionUser();
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <div>
          <TopNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
          <div className="container">
            <h2><FormattedMessage id="myQuestionsStatus" /></h2>
            <br />
            <FormattedMessage id="onceAdded" />
            <br /><br />
            <MyContributionStatus  contributions={ this.props.userContribution } language={this.props.language} />
          </div>
      </div>
      <Footer logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
     </IntlProvider>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.loginSignUpReducer, ...state.settingsReducer, ...state.contributionsReducer, ...state.usersReducer
  };
}

export default connect(mapStateToProps, actionCreators)(withCookies(MyQuestionsStatus));