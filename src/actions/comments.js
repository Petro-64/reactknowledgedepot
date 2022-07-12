export function postComment({comment, route}){
    return (dispatch) => {
        dispatch(postCommentDispatch({comment, route}))
    };
}

export function postReport({questionId}){
    return (dispatch) => {
        dispatch(postReportDispatch({questionId}))
    };
}

function postCommentDispatch({comment, route}){
    return{
        type: 'POST_COMMENT',
        comment: comment,
        route: route,
    }
}

function postReportDispatch({questionId, userId}){
    return{
        type: 'POST_REPORT',
        questionId: questionId,
        userId: userId
    }
}

export function getRatelimiterSettings(){
    return (dispatch) => {
        dispatch(getRatelimiterSettingsDispatch())
    };
}

function getRatelimiterSettingsDispatch(){
    return{
        type: 'GET_RATE_LIMITER_SETTINGS'
    }
}
