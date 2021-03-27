import axios from 'axios';
import helpers from '../helpers/Helpers';
import { LOAD_RESULTS, CLEAR_SENSITIVE_INFO, SET_RESULTS_FILTERED, SET_RESULTS_FILTER_ACTIVE_SUBJECTS, 
    SET_RESULTS_FILTER_ITEMS_PAGE, SET_RESULTS_FILTER_NUMBER_OF_PAGINATIONS, SET_RESULTS_FILTER_CURRENT_PAGINATION, SET_RESULTS_FILTER_SORTING_OPTION } from '../types';
import store from '../index.js';

const BaseUrl = helpers.UrlSniffer();

export function loadResults(){
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const itemsPerPage = store.getState().resultsReducer.resultsFilterPerPage;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/results', {
            headers: headers
        })
        .then(responce => {
            if(responce.data.payload.success === "true"){
                let resultsFilterBySubjectsAndSort = helpers.FilterBySubjectsAndSort(responce.data.payload.results, store.getState().resultsReducer.resultsFilterActiveSubjects, store.getState().resultsReducer.resultsFilterSortingOption);
                dispatch(setNumberOfPaginationAction(Math.ceil(resultsFilterBySubjectsAndSort.length/itemsPerPage)));
                dispatch(setResultsFiltered(helpers.PaginatedResults(resultsFilterBySubjectsAndSort, itemsPerPage, store.getState().resultsReducer.resultsFilterPaginationNumber)))
                dispatch(changeResults(responce.data.payload.results))
            } else {
                dispatch(clearSensitiveinfo([]))
            };
        })
        .catch(error => {
            throw(error);
        });
    }
}

export function setResultsFilterActiveSubjects(subjects){
    return(dispatch) => {
        dispatch(ResultsFilterActiveSubjects(subjects))
    }
}

export function setNumberOfPaginationAction(number){
    return(dispatch) => {
        dispatch(setNumberOfPagination(number))
    }
}

export function setResultsFiltered(results){
    return(dispatch) => {
        dispatch(ResultsFiltered(results))
    }
}

export function setItemsPerPage(items){
    return(dispatch) => {
        dispatch(setItemPerPage(items))
    }
}

export function setCurrentPaginationAction(number){
    return(dispatch) => {
        dispatch(setCurrentPagination(number))
    }
}

export function setSortingOptionAction(number){
    return(dispatch) => {
        dispatch(setSortingOption(number))
    }
}

function setSortingOption(number){
    return {
        type: SET_RESULTS_FILTER_SORTING_OPTION,
        sortingOption: number 
    }
}

function setCurrentPagination(number){
    return {
        type: SET_RESULTS_FILTER_CURRENT_PAGINATION,
        currentPagination: number 
    }
}

function setNumberOfPagination(number){
    return {
        type: SET_RESULTS_FILTER_NUMBER_OF_PAGINATIONS,
        numberOfPagination: number 
    }
}

function setItemPerPage(items){
    return {
        type: SET_RESULTS_FILTER_ITEMS_PAGE,
        items: items 
    }
}

function ResultsFiltered(ResultsFiltered){
    return{
        type: SET_RESULTS_FILTERED,
        resultsFiltered: ResultsFiltered    
    }
}

function ResultsFilterActiveSubjects(subjects){
    return{
        type: SET_RESULTS_FILTER_ACTIVE_SUBJECTS,
        resultsFilterActiveSubjects: subjects    
    }
}

function changeResults(results){
    return{
        type: LOAD_RESULTS,
        results: results    
    }
}


function clearSensitiveinfo(){
    return{
        type: CLEAR_SENSITIVE_INFO,
    }
}