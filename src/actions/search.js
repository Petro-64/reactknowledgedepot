export function searchQuestionByKeyWord({questionsearchkeyword}){
    return (dispatch) => {
        dispatch(searchQuestionByKeyWordDispatch({questionsearchkeyword}))
    };
}

export function searchQuestionByTypeAhead(questionsearchtypeahead){
    return (dispatch) => {
        dispatch(searchQuestionByTypeAheadDispatch(questionsearchtypeahead))
    };
}

function searchQuestionByTypeAheadDispatch(questionsearchtypeahead){
    return{
        type: 'SEARCH_QUESTION_BY_TYPEAHEAD',
        questionsearchtypeahead: questionsearchtypeahead,
    }
}


function searchQuestionByKeyWordDispatch({questionsearchkeyword}){
    return{
        type: 'SEARCH_QUESTION_BY_KEYWORD',
        questionsearchkeyword: questionsearchkeyword,
    }
}


export function setRedirectFlag(){
    return (dispatch) => {
        dispatch(setRedirectFlagDispatch())
    };
}

function setRedirectFlagDispatch(){
    return{
        type: 'SET_REDIRECT_FLAG_TO_BACK_TO_QUESTIONS_LIST',
        n: '',
    }
}