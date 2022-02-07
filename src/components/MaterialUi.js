import React from 'react';
import '../App.css';
import TopNavigation from './TopNavigation';
import Footer from './Footer';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Subjects';
import MaterialUiNavigation from './MaterialUiNavigation';

class MaterialUi extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.countdown = React.createRef();
  }

  state = {
    subject: '',
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <MaterialUiNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
        <div>
            <div className="container">
              <h2><FormattedMessage id="subjControlCenter" /></h2><br/><br/>
              <FormattedMessage id="atTheMomentSubjList" />:<br/><br/>
            </div>
        </div>
        <Footer logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
      </IntlProvider>
    )
  }
}

const mapStateToProps=(state)=>{
    return {
      ...state.testReducer, ...state.loginSignUpReducer, ...state.subjectsReducer, ...state.settingsReducer
    };
  }

export default (connect(mapStateToProps, actionCreators))(MaterialUi);