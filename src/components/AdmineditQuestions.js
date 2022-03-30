import React from 'react';
import '../App.css';
import MaterialUiNavigation from './MaterialUiNavigation';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Questions';
import EditQuestionTable from "./forms/EditQuestionTable";
import 'react-accessible-accordion/dist/fancy-example.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import StyledAccordeon from '../styled/StyledAccordeon';
import Select from './formelements/Select';
import PaginationSimple from './formelements/PaginationSimple';
import helpers from '../helpers/Helpers';



class AdmineditQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      resultsPerPage: [
        {id: 5, value: "5"},
        {id: 10, value: "10"},
        {id: 20, value: "20"},
        {id: 50, value: "50"},
      ],
      activityDropdown: [
        {id: 1, value: "All"},
        {id: 2, value: "Active"},
        {id: 3, value: "Unactive"},
      ],
    }
  }

  onDropdownChangeItemsPerPage = (event) => {
    this.props.setCurrentPagination(1);
    let resultsPaginated = helpers.SimplePaginatedResults(this.props.questions, event.target.value, 1);
    this.props.setResultsPaginated(resultsPaginated);
    this.props.setItemsPerPage(event.target.value);
  };

  onDropdownChangeStatus = (event) => {
    this.props.setCurrentPagination(1);
    this.props.setStatus(event.target.value);
    this.props.loadQuestions();
  };

  componentDidMount(){
    this.props.loadSubjectsAdmin();
    this.props.setRedirectFlagToBackToQuestionsList(1);
  }

  componentWillUnmount(){}

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  onDropdownChange = (event) => {// subjects dropdown
    let subjNameObj = this.props.subjectsAdmin.filter(value => value.id === event.target.value);
    let subjName;
    if(typeof subjNameObj[0] !== "undefined"){
      subjName = subjNameObj[0].name;
    } else {
      subjName = '';
    }
    

    this.props.setSubjName(subjName)
    this.props.setCurrentPagination(1);
    if(event.target.value !== 0){
        this.setState({
            currentSubjectId: event.target.value,
          })
    } else {
        this.setState({
            currentSubjectId: event.target.value,
         })
    }
    this.props.setCurrentSubjectIdToAddQuestion(event.target.value);
    this.props.loadQuestions();
  }

  paginationClick = (i) => {
    this.props.setCurrentPagination(i);
    let resultsPaginated = helpers.SimplePaginatedResults(this.props.questions, this.props.resultsFilterPerPage, i);
    this.props.setResultsPaginated(resultsPaginated);
  }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
      <div>
          <MaterialUiNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
          <div className="container">
            <h2><FormattedMessage id="editQuestion" /></h2>
            <p style={this.props.numberOfQuestionsBySubject !== 0 ? {display: 'none'} : {}}><FormattedMessage id="firstt" /></p>
            <p style={this.props.numberOfQuestionsBySubject !== 0 ? {} : {display: 'none'}}><FormattedMessage id="currentSubject" />&nbsp;{this.props.currentSubjectName}</p>
            <select className="form-control" onChange={this.onDropdownChange} value={this.props.currentSubjectId}>
            <FormattedMessage id="select">{(formattedValue)=>(<option key="0" value="0">{formattedValue}</option>)}</FormattedMessage>{/* ugly way to get just translated string, but this works */}
                {
                this.props.subjectsAdmin.map((value) => 
                (<option key={value.id} value={value.id}>{value.name}</option>))
                }
            </select>
            <br />
            <div style={this.props.numberOfQuestionsBySubject === 0  ? {display: 'none'} : {}}>
              <StyledAccordeon>
                  <Accordion allowMultipleExpanded="true" allowZeroExpanded="true">
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                              <FormattedMessage id="filterResults" />
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <table className="resultsFilter">
                            <tbody>
                              <tr>
                                <th><FormattedMessage id="itemsPerPage" />:</th>
                                <th><FormattedMessage id="status" />:</th>
                                <th><FormattedMessage id="cleareditedList" /></th>
                              </tr>
                              <tr>
                                <td><Select options={this.state.resultsPerPage} onChange={this.onDropdownChangeItemsPerPage} defaultt={this.props.resultsFilterPerPage}/></td>
                                <td><Select options={this.state.activityDropdown} defaultt={this.props.currentStatus} onChange={this.onDropdownChangeStatus} /></td>
                                <td>
                                  <button type="button" className="btn btn-danger" onClick={this.props.clearEditedQuestionsList}>
                                    <FormattedMessage id="cleareditedList" />
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
              </StyledAccordeon>
              <PaginationSimple totalNumberOfItems={this.props.numberOfQuestionsBySubject} itemsPerPage={this.props.resultsFilterPerPage} paginationClick={this.paginationClick} currentPagination={this.props.currentPagination} />
              <EditQuestionTable 
              questions={ this.props.questionsPaginated } 
              language={this.props.language}
              toggleQuestionActivity={this.props.toggleQuestionActivity}
              onTdRollover={this.props.loadAnswers}
              answersToShow={this.props.answers}
              editedQuestionsArray={this.props.recentlyEditedQuestionsarray}
             />
              <PaginationSimple totalNumberOfItems={this.props.numberOfQuestionsBySubject} itemsPerPage={this.props.resultsFilterPerPage} paginationClick={this.paginationClick} currentPagination={this.props.currentPagination} />
            </div>
          </div>
      </div> 
    </IntlProvider>  
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.testReducer, ...state.usersReducer, ...state.loginSignUpReducer, ...state.settingsReducer,  ...state.questionsReducer, ...state.subjectsReducer,  ...state.resultsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(AdmineditQuestions);