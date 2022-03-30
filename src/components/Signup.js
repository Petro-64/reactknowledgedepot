import React from 'react'
import MaterialUiNavigationMini from './MaterialUiNavigationMini';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import SignupFormN from "./forms/signupFormN";
import SignupFormNoRecaptcha from "./forms/signupFormNoRecaptcha";
import helpers from '../helpers/Helpers';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Signup';



class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.recaptchaClick.bind(this);
    this.state={
      recaptcatext: '',
      passwordType: 'password'
    }
  }

  componentDidMount = () => {
    this.recaptchaClick();
    this.props.loadGlobalSettings();
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

  toggleVisibility = () =>{
    this.state.passwordType === 'password' ? this.setState({ passwordType: 'text' }) : this.setState({ passwordType: 'password' });
  }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <div>
        <MaterialUiNavigationMini logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} toggleLanguage={this.toggleLanguage} language={this.props.language}/>            <div className="container">
              <center><h2><FormattedMessage id="register" /></h2></center>
              {this.props.needToShowRecaptcha === 1 && 
              <SignupFormN onSubmit={()=>{this.props.signup()}} 
              errorMessage={this.props.loginError} 
              errorMessageVisibility={this.props.loginErrorVisibility} 
              recaptchaText={this.state.recaptcatext} 
              onRecaptcaClick={this.recaptchaClick}
              language={this.props.language}
              whatToShow={this.state.passwordType}
              toggleVisibility={this.toggleVisibility.bind(this)}
              />
              }

              {this.props.needToShowRecaptcha === 0 && 
              <SignupFormNoRecaptcha onSubmit={()=>{this.props.signup()}} 
              errorMessage={this.props.loginError} 
              errorMessageVisibility={this.props.loginErrorVisibility} 
              onRecaptcaClick={this.recaptchaClick}
              language={this.props.language}
              whatToShow={this.state.passwordType}
              toggleVisibility={this.toggleVisibility.bind(this)}
              />
              }
            </div>
            
        </div> 
     </IntlProvider>  
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.testReducer, ...state.loginSignUpReducer, ...state.settingsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(Signup);