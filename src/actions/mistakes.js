export function getMistakes(){
    return (dispatch) => {
        dispatch(getMistakesDispatch())
    };
}

export function setCurrentMistakesSubjectId(id){
    return (dispatch) => {
        dispatch(setCurrentMistakesSubjectIdDispatch(id))
    };
}

export function setMistakesFiltered(mistakesFiltered){
    return (dispatch) => {
        dispatch(setMistakesFilteredDispatch(mistakesFiltered))
    };
}

export function setCurrentMistakesSubjectName(name){
    return (dispatch) => {
        dispatch(setCurrentMistakesSubjectNameDispatch(name))
    };
}


function setMistakesFilteredDispatch(mistakesFiltered){
    return{
        type: 'SET_MISTAKES_FILTERED',
        mistakesFiltered: mistakesFiltered
    }
}


function getMistakesDispatch(){
    return{
        type: 'GET_MISTAKES'
    }
}

function setCurrentMistakesSubjectIdDispatch(id){
    return{
        type: 'SET_CURRENT_MISTAKES_SUBJECT_ID',
        id: id
    }
}

function setCurrentMistakesSubjectNameDispatch(name){
    return{
        type: 'SET_CURRENT_MISTAKES_SUBJECT_NAME',
        name: name
    }
}
