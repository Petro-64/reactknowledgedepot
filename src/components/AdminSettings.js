import React from 'react';
import '../App.css';
import MaterialUiNavigation from './MaterialUiNavigation';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { IntlProvider } from "react-intl";
import messages from '../translations/Home';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion';
  import 'react-accessible-accordion/dist/fancy-example.css';
  import StyledAccordeon from '../styled/StyledAccordeon'

class AdminSettings extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }
  
  componentDidMount(){
    this.props.loadGlobalSettings();
  }
  toggleEmailConfirmation(){
    this.props.toggleEmailConfirmation();
  }

  toggleRecaptcha(){
    this.props.toggleRecaptcha();
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  render() {
    return (
          <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
            <div>
            <MaterialUiNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
            <div className="container">
              <h2>Global Settings</h2>
              <StyledAccordeon>
                <Accordion allowMultipleExpanded="true" allowZeroExpanded="true">
                  <AccordionItem>
                      <AccordionItemHeading>
                          <AccordionItemButton>
                            Email confirmation
                          </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <div style={this.props.needEmailConfirmation === 0 ? {} : {display: 'none'}}>
                            Disabled &nbsp;&nbsp;&nbsp;&nbsp;<button type="button" className="btn btn-success" onClick={this.toggleEmailConfirmation.bind(this)}>Click to enable</button>{/* onClick={this.clickYes.bind(this)} */}
                        </div>
                        <div style={this.props.needEmailConfirmation === 1 ? {} : {display: 'none'}}>
                            Enabled &nbsp;&nbsp;&nbsp;&nbsp;<button type="button" className="btn btn-danger" onClick={this.toggleEmailConfirmation.bind(this)}>Click to disable</button>
                        </div>
                      </AccordionItemPanel>
                      <AccordionItem>
                      <AccordionItemHeading>
                          <AccordionItemButton>
                            Use recaptcha on signup
                          </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <div style={this.props.needToShowRecaptcha === 0 ? {} : {display: 'none'}}>
                            Disabled &nbsp;&nbsp;&nbsp;&nbsp;<button type="button" className="btn btn-success" onClick={this.toggleRecaptcha.bind(this)}>Click to enable</button>{/* onClick={this.clickYes.bind(this)} */}
                        </div>
                        <div style={this.props.needToShowRecaptcha === 1 ? {} : {display: 'none'}}>
                            Enabled &nbsp;&nbsp;&nbsp;&nbsp;<button type="button" className="btn btn-danger" onClick={this.toggleRecaptcha.bind(this)}>Click to disable</button>
                        </div>
                      </AccordionItemPanel>
                  </AccordionItem>
                  </AccordionItem>
              </Accordion>
            </StyledAccordeon><br/><br/>
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

export default connect(mapStateToProps, actionCreators)(AdminSettings);