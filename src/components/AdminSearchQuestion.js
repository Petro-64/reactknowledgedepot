import React from 'react';
import '../App.css';
import MaterialUiNavigation from './MaterialUiNavigation';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/SearchForQuestions';
import {withCookies} from 'react-cookie';
import Button from '@mui/material/Button';
import QuestionSearchResultRow from './forms/QuestionSearchResultRow';


import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import SearchQuestionByKeyWord from './forms/SearchQuestionByKeyWord';


import StyledAccordeon from '../styled/StyledAccordeon';
import Select from './formelements/Select';
import { formValueSelector } from 'redux-form';

class AdminSearchQuestion extends React.Component {
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
    this.props.setRedirectFlag();
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
  const { questionsearchkeyword } = this.props;
  return (
        <div>
          <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
            {/*<TopNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>*/}
            <MaterialUiNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
            <div className="container" style={(this.state.needToRedirectToLogin.length > 5) ? {display: 'none'} : {}}>
                <h2><FormattedMessage id="searchForQusestion" /></h2>
                <StyledAccordeon>
                  <Accordion allowMultipleExpanded="true" allowZeroExpanded="true">
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                              <FormattedMessage id="searchByKeyword" />
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <SearchQuestionByKeyWord onSubmit={()=>{this.props.searchQuestionByKeyWord({questionsearchkeyword})}} language={this.props.language}/>
                            <div style={this.props.foundQuestionsByWord.length === 0  ? {display: 'none'} : {}}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>{/* <FormattedMessage id="name" /> */}
                                        <th>Question</th>{/* <FormattedMessage id="email" /> */}
                                        <th>Subject Id</th>{/*? <FormattedMessage id="createdAt" /> */}
                                        <th>User Id</th>{/* <FormattedMessage id="status" /> */}
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.foundQuestionsByWord.map(question => <QuestionSearchResultRow 
                                        question={question} 
                                        key={question.id}
                                        keyWord = {questionsearchkeyword}
                                        loadAnswers = {this.props.loadAnswers}
                                        answersToShow={this.props.answers}
                                    /> )}
                                </tbody>
                            </table>
                            </div>
                        </AccordionItemPanel>
                        <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                              <FormattedMessage id="searchById" />
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            hhhhhhhhhhhhhhhhhhh
                        </AccordionItemPanel>
                    </AccordionItem>
                    </AccordionItem>
                </Accordion>
              </StyledAccordeon>
            </div>
          </IntlProvider>
        </div>
    )
  }
}

const selector = formValueSelector('SearchQuestionByKeyWord');

AdminSearchQuestion = connect(
    state => {
        const questionsearchkeyword = selector(state, 'questionsearchkeyword')
        return {
            questionsearchkeyword,
        }
    }
    )(AdminSearchQuestion) 

const mapStateToProps=(state)=>{
  return {
    ...state.testReducer, ...state.loginSignUpReducer, ...state.subjectsReducer, ...state.settingsReducer, ...state.questionsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(withCookies(AdminSearchQuestion));
