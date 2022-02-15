import React from 'react';
import '../App.css';
import MaterialUiNavigation from './MaterialUiNavigation';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import AddSubjectForm from "./forms/addSubjectForm";
import EditSubjectForm from "./forms/EditSubjectForm";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Subjects';


class Subjects extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.countdown = React.createRef();
  }

  state = {
    subject: '',
  }

  componentDidMount(){
    this.props.loadSubjectsAdmin();
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <div>
          <MaterialUiNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} toggleLanguage={this.toggleLanguage} language={this.props.language}/>            <div className="container">
              <h2><FormattedMessage id="subjControlCenter" /></h2><br/><br/>
              <AddSubjectForm onSubmit={()=>{this.props.addSubjectOne()}} language={this.props.language}/><br/><br/>
              <FormattedMessage id="atTheMomentSubjList" />:<br/><br/>
              <EditSubjectForm subjects={this.props.subjectsAdmin} 
                saveSubject={this.props.saveSubject} 
                deleteSubject={this.props.deleteSubject} 
                toggleSubjectActivity={this.props.toggleSubjectActivity}
                language={this.props.language}
                />
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

export default (connect(mapStateToProps, actionCreators))(Subjects);