import axios from 'axios';
import helpers from '../helpers/Helpers';
import { CLEAR_SENSITIVE_INFO, SET_FLASH_MESSAGES_VISIBILITY, SET_FLASH_MESSAGES_MESSAGE, SET_FLASH_MESSAGES_TYPE, SET_LANGUAGE, SET_GLOBAL_SETTINGS, 
    SET_COOKIE_CONSENT_VISIBILITY, SET_COOKIE_CONSENT_OBTAINED } from '../types';
import store from '../index.js';
import {reset} from 'redux-form';

const BaseUrl = helpers.UrlSniffer();

export function setLanguage(lang){
    return(dispatch) => {
        dispatch(setLanguageDispatch(lang))
    }
}

export function changePassword(){
    const password = store.getState().form.changePasswordFormRedux.values.password;// in this case store is available
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const timeout = store.getState().settingsReducer.flashMessagesTimeout;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.post(BaseUrl + 'react/changepassword', { password }, {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                dispatch(clearSensitiveinfo())
                dispatch(changeFlashMessageVisibility(1));
                dispatch(changeFlashMessageMessage('Password has been changed successfully, please login with new credentials'));
                dispatch(changeFlashMessageType('success'));
                setTimeout(function(){ dispatch(changeFlashMessageVisibility(0)); }, timeout);
            } else {
                alert("Network error, please try again later");
            };
        })
        .catch(error => {
            throw(error);
        });
    };
}

export function toggleEmailConfirmation(){
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    const timeout = store.getState().settingsReducer.flashMessagesTimeout;
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/toggleemailconfirmation', {
            headers: headers
        }).then((responce)=>{
            if(responce.data.payload.success === "true"){
                dispatch(changeSettingsAdmin(responce.data.payload.settings));
                dispatch(changeFlashMessageVisibility(1));
                dispatch(changeFlashMessageMessage('Email confirmation has been changed successfully'));
                dispatch(changeFlashMessageType('success'));
                setTimeout(function(){ dispatch(changeFlashMessageVisibility(0)); }, timeout);
            } else {
                alert("Network error, please try again later");
            };
        })
    }
}

export function toggleRecaptcha(){
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    const timeout = store.getState().settingsReducer.flashMessagesTimeout;
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/toggletogglerecaptcha', {
            headers: headers
        }).then((responce)=>{
            if(responce.data.payload.success === "true"){
                dispatch(changeSettingsAdmin(responce.data.payload.settings));
                dispatch(changeFlashMessageVisibility(1));
                dispatch(changeFlashMessageMessage('Recaptcha has been changed successfully'));
                dispatch(changeFlashMessageType('success'));
                setTimeout(function(){ dispatch(changeFlashMessageVisibility(0)); }, timeout);
            } else {
                alert("Network error, please try again later");
            };
        })
    }
}

export function loadGlobalSettings(lang){
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/getglobalsettings').then((responce)=>{
            if(responce.data.payload.success === "true"){
                dispatch(changeSettingsAdmin(responce.data.payload.settings))
            } else {
                alert("Network error, please try again later");
            };
        })
    }
}

export function setCookieConsentVisibility(visibility){
    const userId = store.getState().loginSignUpReducer.userId;
    const roleId = store.getState().loginSignUpReducer.roleId;
    if(visibility == 0 && userId && roleId !== 4){ /// roleId == 4 is the suspended user 
        const JWT = store.getState().loginSignUpReducer.JWToken;
        const headers = { 'JWToken': JWT };
        return (dispatch) => {
            return axios.get(BaseUrl + 'react/cookieconsent/'+ userId, {
                headers: headers
            }).then((responce)=>{
                if(responce.data.payload.success === "true"){
                    dispatch(setCookieConsenGiven(1));
                    dispatch(setCookieConsentVisibilityDispatch(0))
                } else {
                    alert("Network error, please try again later");
                };
            })
        }
    } else if(visibility == 0){
        return (dispatch) => {
            dispatch(setCookieConsentVisibilityDispatch(0))
        }
    }

    return (dispatch) => {
        dispatch(setCookieConsentVisibilityDispatch(1))
    }
}

function setLanguageDispatch(lang){
    return{
        type: SET_LANGUAGE,
        lang: lang    
    }
}

function setCookieConsentVisibilityDispatch(visibility){
    return{
        type: SET_COOKIE_CONSENT_VISIBILITY,
        cookieConsentVisibility: visibility    
    }
}

function clearSensitiveinfo(){
    return{
        type: CLEAR_SENSITIVE_INFO,
    }
}

function changeFlashMessageVisibility(value){
    return{
        type: SET_FLASH_MESSAGES_VISIBILITY,
        flashMessageVisibility: value    
    } 
}

function changeFlashMessageMessage(message){
    return{
        type: SET_FLASH_MESSAGES_MESSAGE,
        flashMessageMessage: message    
    }
}

function changeFlashMessageType(type){
    return{
        type: SET_FLASH_MESSAGES_TYPE,
        flashMessageType: type    
    }
}

function changeSettingsAdmin(settings){
    return{
        type: SET_GLOBAL_SETTINGS,
        settings: settings    
    }
}

function setCookieConsenGiven(value){
    return{
        type: SET_COOKIE_CONSENT_OBTAINED,
        cookieConsenGiven: value    
    }
}