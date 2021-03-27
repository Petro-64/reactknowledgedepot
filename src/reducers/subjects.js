import { LOAD_SUBJECTS_ADMIN, LOAD_SUBJECTS_USER, CLEAR_SENSITIVE_INFO } from '../types'

let subjectsState={
    subjectsAdmin: [],
    subjectsUser: [],
}

const subjectsReducer = (state=subjectsState, action)=>{
    switch (action.type){

    case LOAD_SUBJECTS_ADMIN:
        return{// for admin is sensitive info
            ...state,
            subjectsAdmin: action.subjects
        }

    case LOAD_SUBJECTS_USER:
        return{// for user is public info
            ...state,
            subjectsUser: action.subjectsUser
        }    

    case CLEAR_SENSITIVE_INFO:
        return {
            ...state,
            subjectsN: []
        }

    default: 
        return {
            ...state
        }
    }
} 

export default subjectsReducer;

