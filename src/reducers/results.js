import { LOAD_RESULTS, CLEAR_SENSITIVE_INFO, SET_RESULTS_FILTER_ACTIVE_SUBJECTS, SET_RESULTS_FILTERED, 
    SET_RESULTS_FILTER_ITEMS_PAGE, SET_RESULTS_FILTER_NUMBER_OF_PAGINATIONS, SET_RESULTS_FILTER_CURRENT_PAGINATION, SET_RESULTS_FILTER_SORTING_OPTION } from '../types'

let resultsState={
    results: [],
    resultsFiltered: [],
    resultsFilterActiveSubjects: [],
    resultsFilterPerPage: 10,
    resultsFilterPaginationNumber: 0,// current pagination
    resultsFilterPaginationQuantity: 0,// number of paginations
    resultsFilterSortingOption: "2",
}

const resultsReducer = (state=resultsState, action)=>{
    switch (action.type){

    case LOAD_RESULTS:
        return {
            ...state,
            results: action.results,
            //resultsFiltered: action.results,     
        } 

    case CLEAR_SENSITIVE_INFO:
        return {
            ...state,
            results: [],
            resultsFiltered: [],
            resultsFilterActiveSubjects: []
        }

    case SET_RESULTS_FILTER_ACTIVE_SUBJECTS:
        return {
            ...state,
            resultsFilterActiveSubjects: action.resultsFilterActiveSubjects
        }

    case SET_RESULTS_FILTERED:
        return {
            ...state,
            resultsFiltered: action.resultsFiltered
        }

    case SET_RESULTS_FILTER_ITEMS_PAGE:
        return {
            ...state,
            resultsFilterPerPage: action.items
        }

    case SET_RESULTS_FILTER_NUMBER_OF_PAGINATIONS:
        return {
            ...state,
            resultsFilterPaginationQuantity: action.numberOfPagination
        }    

    case SET_RESULTS_FILTER_CURRENT_PAGINATION:
        return {
            ...state,
            resultsFilterPaginationNumber: action.currentPagination
        }     

    case SET_RESULTS_FILTER_SORTING_OPTION:
        return {
            ...state,
            resultsFilterSortingOption: action.sortingOption
        }          

    default: 
        return {
            ...state
        }
    }
} 

export default resultsReducer;

