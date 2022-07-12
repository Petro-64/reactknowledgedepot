import React from 'react'
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import LoginFormN from "./forms/loginFormN";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Login';
import { withCookies } from 'react-cookie';
import MaterialUiNavigationMini from './MaterialUiNavigationMini'
import { Link} from 'react-router-dom';


class Loginn extends React.Component {

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
      passwordType: 'password'
    };
  }

  componentDidMount(){
    this.state.cook.remove('needToRedirectToLogin');
    this.state.cook.remove('passwordReset');
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

  toggleVisibility = () =>{
    this.state.passwordType === 'password' ? this.setState({ passwordType: 'text' }) : this.setState({ passwordType: 'password' });
  }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <MaterialUiNavigationMini logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
        <div>
          <div className="container">
            <center><h2><FormattedMessage id="login" /></h2>
            <h3 style={(this.state.needToRedirectToLogin.length > 5) ? {} : {display: 'none'}}><FormattedMessage id="thanksforregistration" /></h3>
            <br/><br/>
                <LoginFormN 
                onSubmit={()=>{this.props.loginUserRedux()}} 
                errorMessage={this.props.loginError} 
                errorMessageVisibility={this.props.loginErrorVisibility} 
                language={this.props.language}
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
    ...state.loginSignUpReducer, ...state.settingsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(withCookies(Loginn));