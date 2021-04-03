import React from 'react';
import '../App.css';
import TopNavigation from './TopNavigation';
import Footer from './Footer';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { IntlProvider, FormattedMessage } from "react-intl";
import EditUsersForm from "./forms/EditUsersForm";
import messages from '../translations/Users';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import StyledAccordeon from '../styled/StyledAccordeon'

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  componentDidMount(){
    this.props.loadUsers(); 
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
            <h2><FormattedMessage id="users" /></h2>
            <br/><br/>
            <StyledAccordeon>
                <Accordion allowMultipleExpanded="true" allowZeroExpanded="true">
                  <AccordionItem>
                      <AccordionItemHeading>
                          <AccordionItemButton>
                            Search for users
                          </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                          ghjkghjghjkgh ghjhgjkghj
                      </AccordionItemPanel>
                  </AccordionItem>
              </Accordion>
            </StyledAccordeon><br/><br/>
            <EditUsersForm 
              users={ this.props.users } 
              deleteUser={this.props.deleteUser}  
              toggleuserconfirm={this.props.toggleuserconfirm} 
              toggleusersuspend={this.props.toggleusersuspend} 
              language={this.props.language}
             />
          </div>
      </div> 
      <Footer logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
     </IntlProvider>  
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.testReducer, ...state.usersReducer, ...state.loginSignUpReducer, ...state.settingsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(Users);
