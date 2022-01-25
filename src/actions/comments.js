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

