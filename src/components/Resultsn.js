import React from 'react'
import TopNavigation from './TopNavigation';
import Footer from './Footer';
import {connect} from 'react-redux';
import Checkbox from './formelements/Checkbox';
import Select from './formelements/Select';
import Pagination from './formelements/Pagination';
import * as actionCreators from '../actions/index';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import helpers from '../helpers/Helpers';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/Resultsn';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import StyledAccordeon from '../styled/StyledAccordeon'

class Resultsn extends React.Component {
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
    }
  }

  componentDidMount() {
    this.props.loadSubjectsUsers();
    this.props.loadResults();
    this.selectedCheckboxes = new Set();
    this.props.subjectsUser.map((subject) =>this.selectedCheckboxes.add(subject.name))
  }

  componentWillUnmount() {
    this.props.setCurrentPaginationAction(0);
  }

  filterresults = (initialResults, activeSubjects, resultsFilterPerPage, resultsFilterPaginationNumber, sortingOption) => {
    let filteredBySubjectsAndSort = helpers.FilterBySubjectsAndSort(initialResults, activeSubjects, sortingOption);
    this.props.setNumberOfPaginationAction(Math.ceil(filteredBySubjectsAndSort.length/resultsFilterPerPage));
    return helpers.PaginatedResults(filteredBySubjectsAndSort, resultsFilterPerPage, resultsFilterPaginationNumber);
  }

  toggleCheckbox = (label) => {
    if (this.selectedCheckboxes.has(label)) {  this.selectedCheckboxes.delete(label);  } else {  this.selectedCheckboxes.add(label); }
    let resultsFiltered = this.filterresults(this.props.results, [...this.selectedCheckboxes], this.props.resultsFilterPerPage, 0, this.props.resultsFilterSortingOption);
    this.props.setResultsFiltered(resultsFiltered);
    this.props.setResultsFilterActiveSubjects([...this.selectedCheckboxes]);
    this.props.setCurrentPaginationAction(0);
  }

  createCheckbox = subject => (
    <Checkbox label={subject.name} handleCheckboxChange={this.toggleCheckbox.bind(this)} key={subject.id} />
  )

  createCheckboxes = () => (
    this.props.subjectsUser.map(this.createCheckbox)
  )

  onDropdownChangeItemsPerPage = (event) => {
    let resultsFiltered = this.filterresults(this.props.results, [...this.selectedCheckboxes], event.target.value, 0, this.props.resultsFilterSortingOption);
    this.props.setResultsFiltered(resultsFiltered);
    this.props.setItemsPerPage(event.target.value);
    this.props.setCurrentPaginationAction(0);
  };

  onDropdownChangeSortingOptions = (event) => {
    let resultsFiltered = this.filterresults(this.props.results, [...this.selectedCheckboxes], this.props.resultsFilterPerPage, 0, event.target.value);
    this.props.setResultsFiltered(resultsFiltered);
    this.props.setCurrentPaginationAction(0);
    this.props.setSortingOptionAction(event.target.value);
  };

  paginationClick = (i) => {
    let resultsFiltered = this.filterresults(this.props.results, [...this.selectedCheckboxes], this.props.resultsFilterPerPage, i, this.props.resultsFilterSortingOption);
    this.props.setResultsFiltered(resultsFiltered);
    this.props.setCurrentPaginationAction(i);
  }

  toggleLanguage = (lang) => {
    this.props.setLanguage(lang);
  }

  render() {
    const columns = [{
      dataField: 'quality',
      text:  this.props.language === 'en' ? messages.en.score : messages.ru.score,
      sort: false
    }, {
      dataField: 'answered_questions_number',
      text: this.props.language === 'en' ? messages.en.answeredQuestions : messages.ru.answeredQuestions,
      sort: false
    },{
      dataField: 'createdAt',
      text: this.props.language === 'en' ? messages.en.createdAt : messages.ru.createdAt,
      sort: false
    }, {
      dataField: 'subjectName',
      text: this.props.language === 'en' ? messages.en.subject : messages.ru.subject,
      sort: false
    }
    ]

    const sortOptions = 
    [
      {id: 1, value: this.props.language === 'en' ? messages.en.testDateAsc : messages.ru.testDateAsc },
      {id: 2, value: this.props.language === 'en' ? messages.en.testDateDesc : messages.ru.testDateDesc },
      {id: 3, value: this.props.language === 'en' ? messages.en.resultsAsc : messages.ru.resultsAsc },
      {id: 4, value: this.props.language === 'en' ? messages.en.resultsDesc : messages.ru.resultsDesc },
      {id: 5, value: this.props.language === 'en' ? messages.en.subjAsc : messages.ru.subjAsc },
      {id: 6, value: this.props.language === 'en' ? messages.en.subjsDesc : messages.ru.subjsDesc },
    ]

     return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
      <div>
        <TopNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
        <div className="container">
          <h2><FormattedMessage id="results" /></h2>
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
                              <th><FormattedMessage id="subjects" />:</th>
                              <th><FormattedMessage id="itemsPerPage" />:</th>
                              <th><FormattedMessage id="sortingOptons" />:</th>
                            </tr>
                            <tr>
                              <td>{this.createCheckboxes()}</td>
                              <td><Select options={this.state.resultsPerPage} onChange={this.onDropdownChangeItemsPerPage} defaultt={this.props.resultsFilterPerPage}/></td>
                              <td><Select options={ sortOptions } onChange={this.onDropdownChangeSortingOptions} defaultt={this.props.resultsFilterSortingOption}/></td>
                            </tr>
                          </tbody>
                        </table>
                      </AccordionItemPanel>
                  </AccordionItem>
              </Accordion>
            </StyledAccordeon>
            <div style={(this.props.resultsFiltered.length == 0) ? {display: 'none'} : {}}>
              <Pagination paginationQuantity={this.props.resultsFilterPaginationQuantity} paginationNumber={this.props.resultsFilterPaginationNumber} 
                paginationClick={this.paginationClick}/>
              <BootstrapTable keyField='id' data={ this.props.resultsFiltered } columns={ columns } />
              <Pagination paginationQuantity={this.props.resultsFilterPaginationQuantity} paginationNumber={this.props.resultsFilterPaginationNumber} paginationClick={this.paginationClick}/>
            </div>
            <div style={(this.props.resultsFiltered.length == 0) ? {} : {display: 'none'}}>
              <br /><br /><br /><center><h4><FormattedMessage id="noResults" /></h4></center>
            </div>
        </div>
      </div>
      <Footer logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
     </IntlProvider>   
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.testReducer, ...state.loginSignUpReducer, ...state.resultsReducer, ...state.subjectsReducer, ...state.settingsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(Resultsn);