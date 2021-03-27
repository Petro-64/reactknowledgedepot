///
import React from 'react'
import TopNavigation from './TopNavigation1';
import Footer from './Footer';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import PasswordResetForm from "./forms/passwordresetform";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/PasswordReset';
import { withCookies } from 'react-cookie';


class PasswordReset extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    const { cookies } = props;
    this.state = {
      cook: cookies,
    };
  }

  componentDidMount(){
  }

  componentDidUpdate() {
    if(this.props.redirectFlagForPasswordresetFunctionality == 2){
    this.props.history.push('/app/login');
    }
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
            <h2><FormattedMessage id="passwordreset" /></h2>
            <PasswordResetForm onSubmit={()=>{this.props.resetPassword()}} errorMessage={this.props.loginError} errorMessageVisibility={this.props.loginErrorVisibility} language={this.props.language}/>
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

export default connect(mapStateToProps, actionCreators)(withCookies(PasswordReset));