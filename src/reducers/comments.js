let commentsState={
    commentRateLimiterHours: 0,
    commentRateLimiterQuantity: 0
}

const commentsReducer = (state=commentsState, action) => {
    switch (action.type) {
       case 'SET_RATE_LIMITER':
          return { ...state, commentRateLimiterHours: action.commentRatelimiterHours, commentRateLimiterQuantity: action.commentRatelimiterComments };
       default:
          return state;
     }
  };
  
  export default commentsReducer;