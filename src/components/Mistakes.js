import React from 'react';
import '../App.css';
import MaterialUiNavigation from './MaterialUiNavigation';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Mistakes';
import {withCookies} from 'react-cookie';
import BootstrapTable from 'react-bootstrap-table-next';
import MuiDropDownMenu from './formelements/MuiDropDownMenu';


class Mistakes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSubjectId: '',
      currentSubjectName: ''
    }
  }

  onMuiDropdownChange = (id, name) => {
    this.setState({
      currentSubjectId: id,
      currentSubjectName: name
    })
    this.props.setCurrentMistakesSubjectId(id);
    if(!!name){
      this.props.setCurrentMistakesSubjectName(name);
    } else {
       this.props.setCurrentMistakesSubjectName('');
    }

    this.props.setMistakesFiltered(this.props.mistakes.filter(value => value.name == name));
  }


  componentDidMount(){
    this.props.getMistakes();
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  render() {
    const visibility = true;
    const columns = [{
      dataField: 'name',
      text:  this.props.language === 'en' ? messages.en.subjName : messages.ru.subjName,
      sort: true,
    }, {
      dataField: 'question',
      text: this.props.language === 'en' ? messages.en.question : messages.ru.question,
      sort: false
    }, {
      dataField: 'countt',
      text: this.props.language === 'en' ? messages.en.numbMistakes : messages.ru.numbMistakes,
      sort: true
    }

   ];
   
    const translations = {
      buttonText: this.props.language === 'en' ? messages.en.resendLink : messages.ru.resendLink,
    }
  return (
        <div>
          <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
            <MaterialUiNavigation logoutUser={this.props.logoutUser} 
            userName={this.props.userName} 
            roleId={this.props.roleId} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
            <div className="container">
                <h2><FormattedMessage id="mistakes" /></h2>
                <MuiDropDownMenu options={this.props.subjectsUser} 
                onMuiDropdownChange={this.onMuiDropdownChange} 
                language={this.props.language} 
                messages={messages} 
                visibility={visibility}  
                selectedSubj = {this.props.currentSubjectIdMistakes}/><br/><br/><br/>
                <BootstrapTable keyField='id' data={ this.props.mistakesFiltered } columns={ columns }/>
            </div>
          </IntlProvider>
        </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.testReducer, ...state.loginSignUpReducer, ...state.subjectsReducer, ...state.settingsReducer, ...state.mistakesReducer
  };
}

export default connect(mapStateToProps, actionCreators)(withCookies(Mistakes));
