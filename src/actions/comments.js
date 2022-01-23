export function postComment(comment){
    return (dispatch) => {
        dispatch(postCommentDispatch(comment))
    };
}

function postCommentDispatch(comment){
    return{
        type: 'POST_COMMENT',
        comment: comment
    }
}

export function sentMyContributionSaga({question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId}){
    return (dispatch) => {
        dispatch(sentMyContributionSagADispatch({question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId}))
    };
}

function sentMyContributionSagADispatch({question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId}){
    return{
        type: 'POST_CONTRIBUTION_SAGA', question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId
    }
}
