import React from 'react'
import TopNavigation from './TopNavigation';
import Footer from './Footer';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import LoginForm from "./forms/loginForm";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/AboutCookie';
import { withCookies } from 'react-cookie';


class AboutCookie extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    const { cookies } = props;
    const mycookie = cookies.get('needToRedirectToLogin') ? cookies.get('needToRedirectToLogin') : "empty"
    this.state = {
      email: '',
      password: '',
      cook: cookies,
      needToRedirectToLogin: mycookie,
    };
  }

  componentDidMount(){
    this.state.cook.remove('needToRedirectToLogin');
  }

  handleChangeMail = event => {
    this.setState({ email: event.target.value });
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
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
          <br/>
            <h2><FormattedMessage id="aboutCookieTitle" /></h2>
            <FormattedMessage id="aboutCookieText" />
          </div>
      </div>
      <Footer logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
     </IntlProvider>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.loginSignUpReducer, ...state.settingsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(withCookies(AboutCookie));