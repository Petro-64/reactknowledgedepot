import { SET_CURRENT_SUBJECT_ID, SET_TESTING_SESSION_HASH, SET_CURRENT_SUBJECT_NAME, SET_CURRENT_QUESTION, SET_ANSWERS, 
    SET_NUMBER_OF_ANSWERED, SET_NUMBER_OF_CORRECT, SET_IF_REMAIN_QUESTIONS, SET_CORRECT_ANSWER_ID, SET_IF_TO_SHOW_TEST_HINTS_BORDER,
    SET_IF_TO_SHOW_TEST_HINTS, SET_OVERLAY_VISIBILITY, SET_CURRENT_QUESTION_ID } from '../types'

let testState={
    currentSubjectId: '',
    testingSessionHash: '',
    currentSubjectName: '',
    currentQuestion: '',
    currentQuestionId: '',
    answers: [],
    numberOfAnsweredQuestions: 0,
    numberOfCorrectQuestions: 0,
    ifRemainQuestions: 1,
    correctAnswerId: '',
    toShowTestingHints: "0",// in general , we can disable test hints in account settings
    toShowTestHintsBorder: 0,
    testHintsBorderTimeout: 3000,// how long to show test hints border
    spinnerOverlayVisibility: false,
}

const testReducer = (state=testState, action)=>{
    switch (action.type){
    case SET_CURRENT_SUBJECT_ID:
        return {
            ...state,
            currentSubjectId: action.id     
        } 

    case SET_CURRENT_SUBJECT_NAME:
        return {
            ...state,
            currentSubjectName: action.name     
    }

    case SET_OVERLAY_VISIBILITY:
        return {
            ...state,
            spinnerOverlayVisibility: action.visibility     
    }

    case 'SET_REMAINING_QUESTIONS_TO_ZERO':
        return {
            ...state,
            ifRemainQuestions: 0,
            currentQuestion: '',     
    }

    case SET_IF_TO_SHOW_TEST_HINTS_BORDER:
        return {
            ...state,
            toShowTestHintsBorder: action.visibility 
    }

    case SET_TESTING_SESSION_HASH:
        return {
            ...state,
            testingSessionHash: action.testingSessionHash     
    }

    case SET_CURRENT_QUESTION:
        return {
            ...state,
            currentQuestion: action.currentQuestion     
    }

    case SET_ANSWERS:
        return {
            ...state,
            answers: action.answers    
    }

    case SET_NUMBER_OF_ANSWERED:
        return {
            ...state,
            numberOfAnsweredQuestions: action.number    
    }

    case SET_NUMBER_OF_CORRECT:
        return {
            ...state,
            numberOfCorrectQuestions: action.number    
    }

    case SET_IF_REMAIN_QUESTIONS:
        return {
            ...state,
            ifRemainQuestions: action.number    
    }

    case SET_CORRECT_ANSWER_ID:
        return {
            ...state,
            correctAnswerId: action.id    
    }

    case SET_IF_TO_SHOW_TEST_HINTS:
        return {
            ...state,
            toShowTestingHints: action.ifToShowTestingHints    
    }


    case SET_CURRENT_QUESTION_ID:
        return {
            ...state,
            currentQuestionId: action.id    
    }

    default: 
        return {
            ...state
        }
    }
} 

export default testReducer;

