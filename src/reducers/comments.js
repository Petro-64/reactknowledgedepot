let commentsState={
    commentRateLimiterHours: 0,
    commentRateLimiterQuantity: 0,
    questionReportRatelimiterHours: 0,
    questionReportRatelimiterReports: 0
}

const commentsReducer = (state=commentsState, action) => {
    switch (action.type) {
       case 'SET_RATE_LIMITER':
          return { ...state, 
            commentRateLimiterHours: action.commentRatelimiterHours, 
            commentRateLimiterQuantity: action.commentRatelimiterComments,
            questionReportRatelimiterHours: action.questionReportRatelimiterHours,
            questionReportRatelimiterReports: action.questionReportRatelimiterReports,
         };
       default:
          return state;
     }
  };
  
  export default commentsReducer;