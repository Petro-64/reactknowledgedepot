import { SET_CURRENT_SUBJECT_ID_TO_ADD_QUESTION, SET_RESULTS_FILTERED, SET_RESULTS_FILTER_ITEMS_PAGE, 
    SET_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT, SET_NUMBER_OF_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT, SET_CURRENT_PAGINATION_QUESTIONS_BY_SUBJECT, SET_PAGINATED_QUESTIONS,
    SET_QUESTIONS_TO_EDIT_STATUS, SET_ANSWERS_FOR_QUESTION_ID, SET_ADMIN_EDIT_QUESTION_ITEM, SET_CURRENT_SUBJECT_NAME_FOR_QUESTION_EDIT,
    SET_REDIRECT_FLAG_TO_BACK_TO_QUESTIONS_LIST, PUSH_EDITED_QUESTION_ID_TO_ARRAY_TO_BE_ABLE_TO_SEE_RECENTLY_EDITED_QUESTIONS, CLEAR_EDITED_QUESTIONS_LIST, DELETE_QUESTION} from '../types'

let questionsState={
    questions: [],
    questionsPaginated: [],
    numberOfQuestionsBySubject: 0,
    currentSubjectId: '',
    currentSubjectName: '',
    resultsFilterPerPage: 10,
    currentPagination: 1,
    currentStatus: '1',
    currentQuestionId: '',
    answers: [],
    adminEditQuestionItem: '',
    redirectAfterSuccesfullQuestionsSaving: 1,
    recentlyEditedQuestionsarray: []
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

    case PUSH_EDITED_QUESTION_ID_TO_ARRAY_TO_BE_ABLE_TO_SEE_RECENTLY_EDITED_QUESTIONS:
        return {
            ...state,
            recentlyEditedQuestionsarray: [...state.recentlyEditedQuestionsarray, action.id]
        }  

    case SET_QUESTIONS_TO_EDIT_STATUS:
        return {
            ...state,
            currentStatus: action.status
        } 

    case CLEAR_EDITED_QUESTIONS_LIST:
        return {
            ...state,
            recentlyEditedQuestionsarray: []
        } 

    case SET_REDIRECT_FLAG_TO_BACK_TO_QUESTIONS_LIST:
        return {
            ...state,
            redirectAfterSuccesfullQuestionsSaving: action.n
        } 

    case SET_CURRENT_SUBJECT_NAME_FOR_QUESTION_EDIT:
        return {
            ...state,
            currentSubjectName: action.name
        } 

    case SET_ANSWERS_FOR_QUESTION_ID:
        return {
            ...state,
            answers: action.answers
        } 

    case SET_RESULTS_FILTERED:
        return {
            ...state,
            resultsFiltered: action.resultsFiltered
        }

    case SET_ADMIN_EDIT_QUESTION_ITEM:
        return {
            ...state,
            adminEditQuestionItem: action.content
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