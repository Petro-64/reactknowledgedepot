import { SET_USERS, CLEAR_SENSITIVE_INFO } from '../types'

let usersState={
    users: [],
}

const usersReducer = (state=usersState, action)=>{
    switch (action.type){

    case SET_USERS:
        return{
            ...state,
            users: action.users
        }

    case CLEAR_SENSITIVE_INFO:
        return{
            ...state,
            users: []
        }


    default: 
        return {
            ...state
        }
    }
} 

export default usersReducer;

