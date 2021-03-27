import React from 'react';
import '../App.css';
import TopNavigation from './TopNavigation1';
import Footer from './Footer';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Home';
import {withCookies} from 'react-cookie';
import Carousel from 'react-bootstrap/Carousel'


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    const { cookies } = props;
    const mycookie = cookies.get('needToRedirectToLogin') ? cookies.get('needToRedirectToLogin') : "empty";
    const mycookieRedirectToResetPassword = cookies.get('passwordReset') ? cookies.get('passwordReset') : "empty";

    this.state = {
      needToRedirectToLogin: mycookie,
      needToRedirectToresetPassword: mycookieRedirectToResetPassword,
    };
  }

  componentDidMount(){
    this.props.loadSubjectsUsers();
    setTimeout(() => { 
      if(this.state.needToRedirectToLogin.length > 5){/// this means that user came from email confirmation link
        this.props.history.push('/app/login');
      };
      if(this.state.needToRedirectToresetPassword.length > 5){/// this means that user came from reset password link
        this.props.history.push('/app/resetpassword');
      };
    }, 500);
    this.props.setRedirectFlagForPasswordResetFunction(1);// this is preparation for reset password workflow. If there is certain ciookie, page will be redirected to reset password form
    //and in case of successfull new password establised, we swithch this flag to "2" and from reset form user will be redirected to login form
  }

  resendEmailConfirmation(){
    this.props.resendEmailConfirmation();
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  render() {
    const columns = [{
      dataField: 'name',
      text: this.props.language === 'en' ? messages.en.subject : messages.ru.subject,
      sort: true,
    }, {
      dataField: 'questions_number',
      text: this.props.language === 'en' ? messages.en.numberofqiestions : messages.ru.numberofqiestions,
      sort: true
    }
   ];
    const translations = {
      buttonText: this.props.language === 'en' ? messages.en.resendLink : messages.ru.resendLink,
    }
  return (
        <div>
          <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
            <TopNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
            <div className="container" style={(this.state.needToRedirectToLogin.length > 5) ? {display: 'none'} : {}}>
              <div style={(this.props.roleId === 1 || this.props.roleId === 2 || this.props.roleId === 0) ? {} : {display: 'none'}}>
                <h2><FormattedMessage id="aboutProject" /></h2>
                <p>              <FormattedMessage id="aboutSystem" />              </p>
                <p>                  <FormattedMessage id="atTheMomentWeHave" />                </p>
                <BootstrapTable keyField='id' data={ this.props.subjectsUser } columns={ columns } />
              </div>
              <div style={(this.props.roleId === 3) ? {} : {display: 'none'}}>
              <br/><br/><br/><br/><br/>
                <h1>                  <FormattedMessage id="thanksforregistration" />                </h1>
                <br/><br/>
                <p>                  <FormattedMessage id="verifyaddress" />                </p>
                <p>                  <FormattedMessage id="haventReceivedLink" />                </p>
                <br/><br/>
                <button type="button" className="btn btn-success" onClick={this.resendEmailConfirmation.bind(this)}>{translations.buttonText}</button>
              </div>
              <div style={(this.props.roleId === 4) ? {} : {display: 'none'}}>
              <br/><br/><br/><br/><br/>
                <h2>                  <FormattedMessage id="hi" />{this.props.userName}                </h2>
                <br/><br/>
                <p>                  <FormattedMessage id="accountHasBeenSuspended" /><b>{this.props.suspensionReason}</b>                </p>
                <p>                  <FormattedMessage id="pleasedContactAdminToRestoreAccountStatus" />                </p>
              </div>
            </div>
            <Footer logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
          </IntlProvider>
        </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.testReducer, ...state.loginSignUpReducer, ...state.subjectsReducer, ...state.settingsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(withCookies(Home));
