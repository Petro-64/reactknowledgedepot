import { SET_USER_NAME, SET_ROLE_ID, SET_JWT_TOKEN, SET_USER_ID, CLEAR_SENSITIVE_INFO, 
    LOGIN_ERROR, SET_SIGNUP_CAPTCHA_TEXT, SET_SUSPENSION_REASON, SET_REDIRECT_FLAG_FOR_RESET_PASWORD_FUNCTION } from '../types'

let loginSignUpState={
    loginError: '',
    loginErrorVisibility: 'hidden',
  /*
    userName: '',   
    roleId: 0, //0 by default, 2 for admin
    JWToken: '',
    userId: '',    
      */ 
    userName: 'Petro',   
    roleId: 2, //0 by default, 2 for admin
    JWToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJyb2xlX2lkIjoyLCJsb2dpbl90aW1lc3RhbXAiOjE2ODc1NTA3MzF9.r+fGoDQPPYHQVT/PtpuIubBZ5n0rZBWMR16sKKPzxu8=',
    userId: '1',

    signupCaptchaText: '',
    suspensionReason: '',
    redirectFlagForPasswordresetFunctionality: 1, // when password reset succesfully, we need to redirect user to login page, so this redirect will be controlled by this flag
}

const loginSignUpReducer = (state=loginSignUpState, action)=>{
    switch (action.type){
    case LOGIN_ERROR:
        return{
            ...state,
            loginError: action.loginError,
            loginErrorVisibility: action.loginErrorVisibility
        } 

    case SET_USER_NAME:
        return{
            ...state,
            userName: action.userName
        }

    case SET_JWT_TOKEN:
        return{
            ...state,
            JWToken: action.JWToken
        }

    case SET_ROLE_ID:
        return{
            ...state,
            roleId: action.roleId
        }  

    case SET_USER_ID:
        return{
            ...state,
            userId: action.userId
        } 

    case SET_SIGNUP_CAPTCHA_TEXT:
        return{
            ...state,
            signupCaptchaText: action.recaptchaText
        }

    case CLEAR_SENSITIVE_INFO:
        return{
            ...state,
            userName: '',
            JWToken: '',
            userId: '',
            roleId: 0,
        }

    case SET_SUSPENSION_REASON:
        return{
            ...state,
            suspensionReason: action.suspensionReason,
        }

    case SET_REDIRECT_FLAG_FOR_RESET_PASWORD_FUNCTION:
        return{
            ...state,
            redirectFlagForPasswordresetFunctionality: action.redirectFlagForPasswordResetFunction,
        }

    default: 
        return {
            ...state
        }
    }
} 

export default loginSignUpReducer;