import { SET_CURRENT_SUBJECT_ID_TO_ADD_QUESTION, SET_RESULTS_FILTERED, SET_RESULTS_FILTER_ITEMS_PAGE, 
    SET_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT, SET_NUMBER_OF_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT, SET_CURRENT_PAGINATION_QUESTIONS_BY_SUBJECT, SET_PAGINATED_QUESTIONS } from '../types'

let questionsState={
    questions: [],
    questionsPaginated: [],
    numberOfQuestionsBySubject: '',
    currentSubjectId: '1',
    resultsFilterPerPage: 10,
    currentPagination: 1
}

const questionsReducer = (state=questionsState, action)=>{
    switch (action.type){

    case SET_CURRENT_SUBJECT_ID_TO_ADD_QUESTION:
        return{
            ...state,
            currentSubjectId: action.id
        }  
    
    case SET_RESULTS_FILTER_ITEMS_PAGE:
        return {
            ...state,
            resultsFilterPerPage: action.items
        }    

    case SET_RESULTS_FILTERED:
        return {
            ...state,
            resultsFiltered: action.resultsFiltered
        }

    case SET_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT:
        return {
            ...state,
            questions: action.questions
        }

    case SET_PAGINATED_QUESTIONS:
        return {
            ...state,
            questionsPaginated: action.results
        }


    case SET_NUMBER_OF_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT:
        return {
            ...state,
            numberOfQuestionsBySubject: action.number
        }

    case SET_CURRENT_PAGINATION_QUESTIONS_BY_SUBJECT:
        return {
            ...state,
            currentPagination: action.number
        }

    default: 
        return {
            ...state
        }
    }
} 

export default questionsReducer;