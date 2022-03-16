import React from 'react';
import '../App.css';
import MaterialUiNavigation from './MaterialUiNavigation';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/AccountSettings';
import 'react-accessible-accordion/dist/fancy-example.css';
import ChangePasswordForm from "./forms/ChangePasswordForm";

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      passwordType: 'password'
    };
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  toggleLanguageInternal = (e) =>{
    this.props.setLanguage(e.target.value);
  }

  toggleShowHintsInternal = (e) =>{
    this.props.setIfToShowTestingHints(e.target.value);
  }

  toggleVisibility = () =>{
    this.state.passwordType === 'password' ? this.setState({ passwordType: 'text' }) : this.setState({ passwordType: 'password' });
  }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <MaterialUiNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
        <div>
          <div className="container" style={{ minHeight: "600px" }}>
            <center>
              <h2><FormattedMessage id="changePassword" /></h2>
              <FormattedMessage id="pleaseKeepInMind" />
              <br/><br/>
              <ChangePasswordForm 
              onSubmit={()=>{this.props.changePassword()}} 
              language = {this.props.language}
              messages = {messages} 
              whatToShow={this.state.passwordType} 
              toggleVisibility={this.toggleVisibility.bind(this)}
              />
            </center>
          </div>
        </div>
      </IntlProvider>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.testReducer, ...state.loginSignUpReducer, ...state.subjectsReducer, ...state.settingsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(AccountSettings);


