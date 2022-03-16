export function postComment({comment, route}){
    return (dispatch) => {
        dispatch(postCommentDispatch({comment, route}))
    };
}

function postCommentDispatch({comment, route}){
    return{
        type: 'POST_COMMENT',
        comment: comment,
        route: route,
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
