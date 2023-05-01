import mistakesState from '../states/mistakesState';

const mistakesReducer = (state=mistakesState, action)=>{
    switch (action.type){

    case 'SET_MISTAKES':
        return{
            ...state,
            mistakes: action.mistakes,
            mistakesFiltered: action.mistakes,
            mistakesCut: action.mistakes.slice(0, 20)
        } 

    case 'CLEAN_MISTAKES':
        return{
            ...state,
            mistakes: [],
            mistakesFiltered: [],
            mistakesCut: []
        } 


    case 'SET_MISTAKES_FILTERED':
        return{
            ...state,
            mistakesFiltered: action.mistakesFiltered
        } 

    case 'SET_CURRENT_MISTAKES_SUBJECT_ID':
        return{
            ...state,
            currentSubjectIdMistakes: action.id
        } 

    case 'SET_MISTAKES_CUT':
        return{
            ...state,
            mistakesCut: action.mistakesCut
        } 

    case 'SET_CURRENT_MISTAKES_SUBJECT_NAME':
        return{
            ...state,
            currentSubjectNameMistakes: action.name
        }  

    default: 
        return {
            ...state
        }
    }
} 

export default mistakesReducer;