let commentsState={
    comment: '',
    loading: false,
}

const commentsReducer = (state=commentsState, action) => {
    switch (action.type) {
       case 'POST_COMMENT':
          return { ...state, comment: action.comment };
       default:
          return state;
     }
  };
  
  export default commentsReducer;