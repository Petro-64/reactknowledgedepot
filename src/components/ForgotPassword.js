import React from 'react'
import MaterialUiNavigation from './MaterialUiNavigation';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import ForgotPasswordForm from "./forms/ForgotPasswordForm";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Forgotpassword';
import { withCookies } from 'react-cookie';
import helpers from '../helpers/Helpers';


class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      email: '',
      password: '',
      recaptcatext: '',
    };
    this.recaptchaClick.bind(this);
  }

  componentDidMount(){
    this.recaptchaClick();
  }

  recaptchaClick = () =>{
    let recaptchaText = helpers.makeRandom();
    this.props.setRecaptchaText(recaptchaText);
    this.setState({
      recaptcatext: recaptchaText
    })
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <div>
        <MaterialUiNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
          <div className="container">
            <center><h2><FormattedMessage id="forgotpassword" /></h2></center>
            <FormattedMessage id="pleaseEnter" /><br/><br/>
            <FormattedMessage id="verifyaddress" /><br/><br/>
            <center>
            <ForgotPasswordForm onSubmit={()=>{this.props.sentForgotPasswordForm()}} 
            errorMessage={this.props.loginError} 
            errorMessageVisibility={this.props.loginErrorVisibility} 
            language={this.props.language}
            recaptchaText={this.state.recaptcatext} 
            onRecaptcaClick={this.recaptchaClick}
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
    ...state.loginSignUpReducer, ...state.settingsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(withCookies(ForgotPassword));