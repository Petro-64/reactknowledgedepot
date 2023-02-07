let mistakesState={
    mistakes: [],
    mistakesFiltered: [],
    currentSubjectIdMistakes: '',
    currentSubjectNameMistakes: ''
}

const mistakesReducer = (state=mistakesState, action)=>{
    switch (action.type){

    case 'SET_MISTAKES':
        return{
            ...state,
            mistakes: action.mistakes,
            mistakesFiltered: action.mistakes
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