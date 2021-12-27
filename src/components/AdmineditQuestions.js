import React from 'react';
import '../App.css';
import TopNavigation from './TopNavigation';
import Footer from './Footer';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Questions';
import BootstrapTable from 'react-bootstrap-table-next';
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
      currentSubjectId: '',
      currentSubjectName: '',
      resultsPerPage: [
        {id: 5, value: "5"},
        {id: 10, value: "10"},
        {id: 20, value: "20"},
        {id: 50, value: "50"},
      ],
    }
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  onDropdownChangeItemsPerPage = (event) => {
    let resultsPaginated = helpers.SimplePaginatedResults(this.props.questions, event.target.value, this.props.currentPagination);
    this.props.setResultsPaginated(resultsPaginated);
    this.props.setItemsPerPage(event.target.value);
    this.props.setCurrentPagination(1);
  };

  componentDidMount(){
    this.props.loadSubjectsAdmin();
    this.props.loadQuestions();
    setTimeout(
      () => {
        let resultsPaginated = helpers.SimplePaginatedResults(this.props.questions, this.props.resultsFilterPerPage, this.props.currentPagination);
        this.props.setResultsPaginated(resultsPaginated);
      }, 500
    )
  }

  onDropdownChange = (event) => {// subjects dropdown
    const subjName = this.props.subjectsAdmin.filter(value => value.id == event.target.value);
    if(event.target.value != 0){
        this.setState({
            currentSubjectId: event.target.value,
            currentSubjectName: subjName[0].name
          })
    } else {
        this.setState({
            currentSubjectId: event.target.value,
            currentSubjectName: ''
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
    const columns = [{
        dataField: 'id',
        text:  "id",//this.props.language === 'en' ? messages.en.score : messages.ru.score,
        sort: false
      }, {
        dataField: 'name',
        text: "question",//this.props.language === 'en' ? messages.en.answeredQuestions : messages.ru.answeredQuestions,
        sort: false
      },{
        dataField: 'created_at',
        text: "created at",// this.props.language === 'en' ? messages.en.createdAt : messages.ru.createdAt,
        sort: false
      }
    ]
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
      <div>
          <TopNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
          <div className="container">
            <h2><FormattedMessage id="editQuestion" /></h2>
            <p style={this.state.currentSubjectName === ''  ? {} : {display: 'none'}}><FormattedMessage id="firstt" /></p>
            <p style={this.state.currentSubjectName === ''  ? {display: 'none'} : {}}><FormattedMessage id="currentSubject" />&nbsp;{this.state.currentSubjectName}</p>
            <select className="form-control" onChange={this.onDropdownChange}>
            <FormattedMessage id="select">{(formattedValue)=>(<option key="0" value="0">{formattedValue}</option>)}</FormattedMessage>{/* ugly way to get just translated string, but this works */}
                {
                this.props.subjectsAdmin.map((value) => 
                (<option key={value.id} value={value.id}>{value.name}</option>))
                }
            </select>
            <br />
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
                            </tr>
                            <tr>
                              <td><Select options={this.state.resultsPerPage} onChange={this.onDropdownChangeItemsPerPage} defaultt={this.props.resultsFilterPerPage}/></td>
                            </tr>
                          </tbody>
                        </table>
                      </AccordionItemPanel>
                  </AccordionItem>
              </Accordion>
            </StyledAccordeon>
            <br />

            <PaginationSimple totalNumberOfItems={this.props.numberOfQuestionsBySubject} itemsPerPage={this.props.resultsFilterPerPage} paginationClick={this.paginationClick} currentPagination={this.props.currentPagination} />
            <BootstrapTable keyField='id' data={ this.props.questionsPaginated } columns={ columns } />
            <PaginationSimple totalNumberOfItems={this.props.numberOfQuestionsBySubject} itemsPerPage={this.props.resultsFilterPerPage} paginationClick={this.paginationClick} currentPagination={this.props.currentPagination} />

          </div>
      </div> 
      <Footer logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
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