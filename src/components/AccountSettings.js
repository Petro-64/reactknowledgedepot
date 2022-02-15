import React from 'react';
import '../App.css';
import MaterialUiNavigation from './MaterialUiNavigation';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/AccountSettings';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';
import StyledAccordeon from '../styled/StyledAccordeon';
import ChangePasswordForm from "./forms/ChangePasswordForm";

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  toggleLanguageInternal = (e) =>{
    this.props.setLanguage(e.target.value);
  }

  toggleShowHintsInternal = (e) =>{
    this.props.setIfToShowTestingHints(e.target.value);
  }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <MaterialUiNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
        <div>
        <div className="container" style={{ minHeight: "600px" }}>
          <h2><FormattedMessage id="changePassword" /></h2>
          <FormattedMessage id="pleaseKeepInMind" />&nbsp;&nbsp;&nbsp;
          <ChangePasswordForm onSubmit={()=>{this.props.changePassword()}} language = {this.props.language}   messages = {messages} />
          {/*
          <StyledAccordeon>
            <Accordion allowMultipleExpanded="true" allowZeroExpanded="true">
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                        <FormattedMessage id="setCurrentLanguage" />
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <FormattedMessage id="setCurrentLanguage" />&nbsp;&nbsp;&nbsp;
                    <select onChange={this.toggleLanguageInternal.bind(this)} value={this.props.language} className="languageSelect form-select">
                      <option id="en">en</option>
                      <option id="ru">ru</option>
                    </select>
                  </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionItemHeading>
                      <AccordionItemButton>
                      <FormattedMessage id="changePassword" />
                      </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <FormattedMessage id="pleaseKeepInMind" />&nbsp;&nbsp;&nbsp;
                    <ChangePasswordForm onSubmit={()=>{this.props.changePassword()}} language = {this.props.language}   messages = {messages} />
                  </AccordionItemPanel>
              </AccordionItem>
          </Accordion>
        </StyledAccordeon>
*/}
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

export default connect(mapStateToProps, actionCreators)(AccountSettings);


