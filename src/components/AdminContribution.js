import React from 'react'
import TopNavigation from './TopNavigation1';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { IntlProvider, FormattedMessage } from "react-intl";
import Footer from './Footer';
import messages from '../translations/AdminContribution';
import EditContributionForm from "./forms/EditContributionForm";


class AdminContribution extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount(){
      this.props.loadContributionAdmin();
      this.props.clearAdminContributionItem();
      this.props.setRedirectFlagForAdmin(1);// this is reset for this flag to be able to redirect from edit form to this page after succes. editing, when success flag turns 1nto 2
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
            <h2><FormattedMessage id="contibution" /></h2>
            <EditContributionForm  contributions={ this.props.adminContribution } language={this.props.language} />
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

export default connect(mapStateToProps, actionCreators)(AdminContribution);