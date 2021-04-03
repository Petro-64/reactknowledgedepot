import React from 'react'
import TopNavigation from './TopNavigation';
import Footer from './Footer';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import SignupForm from "./forms/signupForm";
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

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <div>
            <TopNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
            <div className="container">
              <h2><FormattedMessage id="register" /></h2>
              {this.props.needToShowRecaptcha == 1 && 
              <SignupForm onSubmit={()=>{this.props.signup()}} 
              errorMessage={this.props.loginError} 
              errorMessageVisibility={this.props.loginErrorVisibility} 
              recaptchaText={this.state.recaptcatext} 
              onRecaptcaClick={this.recaptchaClick}
              language={this.props.language}
              />
              }

              {this.props.needToShowRecaptcha == 0 && 
              <SignupFormNoRecaptcha onSubmit={()=>{this.props.signup()}} 
              errorMessage={this.props.loginError} 
              errorMessageVisibility={this.props.loginErrorVisibility} 
              onRecaptcaClick={this.recaptchaClick}
              language={this.props.language}
              />
              }
            </div>
        </div> 
        <Footer logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
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