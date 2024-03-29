import { SET_LANGUAGE, SET_FLASH_MESSAGES_VISIBILITY, SET_FLASH_MESSAGES_MESSAGE, SET_FLASH_MESSAGES_TYPE, SET_GLOBAL_SETTINGS,
    SET_COOKIE_CONSENT_VISIBILITY, SET_COOKIE_CONSENT_OBTAINED, CLEAR_SENSITIVE_INFO, SET_MUI_FLASH_MESSAGES_VISIBILITY, 
    SET_MUI_FLASH_MESSAGES_MESSAGE, SET_MUI_FLASH_MESSAGES_TYPE, GET_SQL_DUMP } from '../types'

let settingsState={
    language: 'en',
    flashMessagesVisibility: 0,
    flashMessagesMessage: '',
    flashMessagesType: 'success',// 'error',
    flashMessagesTimeout: 3000,/// how long user will be able to see flash message
    needEmailConfirmation: 0,
    needToShowRecaptcha: 1,
    cookieConsentVisibility: 0,
    cookieConsentObtained: 0,
    muiFlashMessageVisibility: 0,
    muiFlashMessagesMessage1: '',
    muiFlashMessagesType: '',// 'error',
    muiFlashMessagesTimeout: 3000,/// how long user will be able to see flash message
    sqlDump: '',
}

const settingsReducer = (state=settingsState, action)=>{
    switch (action.type){

    case SET_LANGUAGE:
        return{
            ...state,
            language: action.lang
        }

    case SET_FLASH_MESSAGES_VISIBILITY:
        return{
            ...state,
            flashMessagesVisibility: action.flashMessageVisibility
        }

    case SET_MUI_FLASH_MESSAGES_VISIBILITY:
        return{
            ...state,
            muiFlashMessageVisibility: action.muiFlashMessageVisibility
        }

    case SET_MUI_FLASH_MESSAGES_MESSAGE:
        return{
            ...state,
            muiFlashMessagesMessage1: action.muiFlashMessageMessage
        }

    case SET_MUI_FLASH_MESSAGES_TYPE:
        return{
            ...state,
            muiFlashMessagesType: action.muiFlashMessageType
        }

    case SET_FLASH_MESSAGES_MESSAGE:
        return{
            ...state,
            flashMessagesMessage: action.flashMessageMessage
        }

    case 'SET_FLASH_MESSAGES_MESSAGE_1':
        return{
            ...state,
            flashMessagesMessage: action.flashMessageMessage
        }

    case SET_FLASH_MESSAGES_TYPE:
        return{
            ...state,
            flashMessagesType: action.flashMessageType
        }

    case SET_GLOBAL_SETTINGS:
        return{
            ...state,
            needEmailConfirmation: action.settings.emailConfirmation,
            needToShowRecaptcha: action.settings.signupRecaptcha,
        }

    case SET_COOKIE_CONSENT_VISIBILITY:
        return{
            ...state,
            cookieConsentVisibility: action.cookieConsentVisibility,
        }

    case SET_COOKIE_CONSENT_OBTAINED:
        return{
            ...state,
            cookieConsentObtained: action.cookieConsenGiven,
        }

    case CLEAR_SENSITIVE_INFO:
        return{
            ...state,
            cookieConsentObtained: 0,
        }

    case GET_SQL_DUMP:
        return{
            ...state,
            sqlDump: action.data,
        }

    default: 
        return {
            ...state
        }
    }
} 

export default settingsReducer;