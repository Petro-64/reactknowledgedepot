import axios from 'axios';
import helpers from '../helpers/Helpers';
import { LOGIN_ERROR, SET_ROLE_ID, SET_USER_NAME, SET_JWT_TOKEN, SET_USER_ID, CLEAR_SENSITIVE_INFO,
    SET_SIGNUP_CAPTCHA_TEXT, SET_COOKIE_CONSENT_OBTAINED, SET_SUSPENSION_REASON, SET_REDIRECT_FLAG_FOR_RESET_PASWORD_FUNCTION, 
    SET_MUI_FLASH_MESSAGES_VISIBILITY } from '../types';
import store from '../index.js';
import {reset} from 'redux-form';
import messages from '../translations/actions/loginsignup';
import showMuiFlashMessage from './snackBarControl';

const BaseUrl = helpers.UrlSniffer();

export const loginUserRedux = () => {
    const email = store.getState().form.loginFormRedux.values.email;// in this case store is available
    const password = store.getState().form.loginFormRedux.values.password;// in this case store is available
    const translations = {
        wrongEmailPassword:  store.getState().settingsReducer.language === 'en' ? messages.en.wrongEmailPassword : messages.ru.wrongEmailPassword,
    }
    return (dispatch) => {
        return axios.post(BaseUrl + 'react/login', {email, password})
        .then(response => {
            ////console.log(response.data.data.jwt_token);//////////////////////////////////////////////////
            if(response.data.data.success === "true"){
                dispatch(setRoleId(response.data.data.role_id));
                dispatch(setUserName(response.data.data.name));
                dispatch(setUserSuspensionReason(response.data.data.suspension_reason));
                dispatch(setJWToken(response.data.data.jwt_token));
                dispatch(setUserId(response.data.data.id));
                dispatch(setCookieConsenGiven(response.data.data.cookie_consent_given));
            } else {
                dispatch(clearSensitiveinfo())
                showMuiFlashMessage(dispatch, translations.wrongEmailPassword , 'error');
                setTimeout(function(){ 
                        dispatch(createHideLoginError()) 
                 }, 2000);
            };
        })
        .catch(error => {
            throw(error);
        });
    };
}

export function signup(){
    const name = store.getState().form.signupForm.values.name;// in this case store is available
    const email = store.getState().form.signupForm.values.email;// in this case store is available
    const password = store.getState().form.signupForm.values.password;// in this case store is available
    const recaptchaFromStore = store.getState().loginSignUpReducer.signupCaptchaText;
    const recaptchaFromForm = store.getState().form.signupForm.values.captcha;
    const ifRecaptchaEnabled = store.getState().settingsReducer.needToShowRecaptcha;
    const translations = {
        accountCreateSuccess:  store.getState().settingsReducer.language === 'en' ? messages.en.accountCreateSuccess : messages.ru.accountCreateSuccess,
        wrongRecaptcha:  store.getState().settingsReducer.language === 'en' ? messages.en.wrongRecaptcha : messages.ru.wrongRecaptcha,
        emailTaken: store.getState().settingsReducer.language === 'en' ? messages.en.emailTaken : messages.ru.emailTaken,
        nameTaken: store.getState().settingsReducer.language === 'en' ? messages.en.nameTaken : messages.ru.nameTaken,
    }
    let errorMessage;
    return (dispatch) => {
        if((ifRecaptchaEnabled === 1) && (recaptchaFromStore !== recaptchaFromForm)){
            showMuiFlashMessage(dispatch, translations.wrongRecaptcha, 'error');
            return false;
        } 
        return axios.post(BaseUrl + 'react/signup', {name, email, password})
        .then(response => {
            if(response.data.data.success === "true"){
                dispatch(setRoleId(response.data.data.role_id));
                dispatch(setUserName(response.data.data.name));
                dispatch(setJWToken(response.data.data.jwt_token));
                dispatch(setUserId(response.data.data.id));
                dispatch(setCookieConsenGiven(response.data.data.cookie_consent_given));
                dispatch(reset('signupForm'));
                showMuiFlashMessage(dispatch, translations.accountCreateSuccess, 'success');
            } else {
                if(response.data.data.message === "This email is already taken"){
                    errorMessage = translations.emailTaken;
                } else if(response.data.data.message === "This name is already taken"){
                    errorMessage = translations.nameTaken;
                }
                dispatch(clearSensitiveinfo())
                showMuiFlashMessage(dispatch, errorMessage, 'error');
                setTimeout(function(){ 
                    dispatch(createHideLoginError()) 
             }, 2000);
            };
        })
        .catch(error => {
            throw(error);
        });
    };
}

export function setRedirectFlagForPasswordResetFunction(value){
    return (dispatch) => {
        dispatch(setRedirectFlagForPasswordResetFunctioDispatch(value));
    };
}

export function sentForgotPasswordForm(){
    const username = store.getState().form.forgotPasswordFormRedux.values.username;// in this case store is available
    const email = store.getState().form.forgotPasswordFormRedux.values.email;// in this case store is available
    const recaptchaFromStore = store.getState().loginSignUpReducer.signupCaptchaText;
    const recaptchaFromForm = store.getState().form.forgotPasswordFormRedux.values.captcha;
    const translations = {
        forgotPasswordSuccess:  store.getState().settingsReducer.language === 'en' ? messages.en.forgotPasswordSuccess : messages.ru.forgotPasswordSuccess,
        wrongRecaptcha:  store.getState().settingsReducer.language === 'en' ? messages.en.wrongRecaptcha : messages.ru.wrongRecaptcha,
    }
    return (dispatch) => {
        if((recaptchaFromStore !== recaptchaFromForm)){
            showMuiFlashMessage(dispatch, translations.wrongRecaptcha, 'error');
            return false;
        } 
        return axios.post(BaseUrl + 'react/forgotpassword', {username, email})
        .then(response => {
            if(response.data.data.success === "true"){
                dispatch(reset('forgotPasswordFormRedux'));
                showMuiFlashMessage(dispatch, translations.forgotPasswordSuccess, 'success');
            } else {
                dispatch(clearSensitiveinfo())
                showMuiFlashMessage(dispatch, response.data.data.message , 'error');
                setTimeout(function(){ 
                    dispatch(createHideLoginError()) 
             }, 2000);
            };
        })
        .catch(error => {
            throw(error);
        });
    };
}

export function resetPassword(){
    const password = store.getState().form.passwordresetform.values.password;// in this case store is available
    const passwordRepeat = store.getState().form.passwordresetform.values.repeatpassword;// in this case store is available
    const translations = {
        newpasswordsavedsucess:  store.getState().settingsReducer.language === 'en' ? messages.en.newpasswordsavedsucess : messages.ru.newpasswordsavedsucess,
        wrongRecaptcha:  store.getState().settingsReducer.language === 'en' ? messages.en.wrongRecaptcha : messages.ru.wrongRecaptcha,
    }
    return (dispatch) => {
        return axios.post(BaseUrl + 'react/resetpassword', {password, passwordRepeat})
        .then(response => {
            if(response.data.data.success === "true"){
                dispatch(reset('passwordresetform'));
                showMuiFlashMessage(dispatch, translations.newpasswordsavedsucess, 'success');
                dispatch(setRedirectFlagForPasswordResetFunctioDispatch(2));//this is done for redirecting from reset form page to login page upon succesfull password reset
            } else {
                dispatch(clearSensitiveinfo())
                showMuiFlashMessage(dispatch, response.data.data.message , 'error');
                setTimeout(function(){ 
                    dispatch(createHideLoginError()) 
             }, 2000);
            };
        })
        .catch(error => {
            throw(error);
        });
    };
}

export function logoutUser(){
    const translations = {
        logoutSuccess:  store.getState().settingsReducer.language === 'en' ? messages.en.logoutSuccess : messages.ru.logoutSuccess,
    }
    return(dispatch) => {
        dispatch(clearSensitiveinfo())
        showMuiFlashMessage(dispatch, translations.logoutSuccess, 'success');
    }
}

export function setMuiFlashVisibility(value){
    return(dispatch) => {
        dispatch(changeMuiFlashMessageVisibility(value))
    }
}

export function resendEmailConfirmation(){
    const userId = store.getState().loginSignUpReducer.userId;
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    const translations = {
        emailConfirmationSuccess:  store.getState().settingsReducer.language === 'en' ? messages.en.emailConfirmationSuccess : messages.ru.emailConfirmationSuccess,
    }
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/resendemailconfirmation/' + userId, {
            headers: headers
        }).then((responce)=>{
            if(responce.data.payload.success === "true"){
                showMuiFlashMessage(dispatch, translations.emailConfirmationSuccess, 'success');
            } else {
                alert("Network error, please try again later resendEmailConfirmation");
            };
        })
    }
}

export function setRecaptchaText(text){
    return(dispatch) => {
        dispatch(setRecaptchaTextDispatch(text))
    }
}

function setRecaptchaTextDispatch(text){
    return{
        type: SET_SIGNUP_CAPTCHA_TEXT,
        recaptchaText: text    
    }
}

function setRoleId(roleId){
    return{
        type: SET_ROLE_ID,
        roleId: roleId    
    }
}

function setUserSuspensionReason(reason){
    return{
        type: SET_SUSPENSION_REASON,
        suspensionReason: reason    
    }
}

function setRedirectFlagForPasswordResetFunctioDispatch(value){
    return{
        type: SET_REDIRECT_FLAG_FOR_RESET_PASWORD_FUNCTION,
        redirectFlagForPasswordResetFunction: value    
    }
}

function setCookieConsenGiven(value){
    return{
        type: SET_COOKIE_CONSENT_OBTAINED,
        cookieConsenGiven: value    
    }
}

function setUserName(userName){
    return{
        type: SET_USER_NAME,
        userName: userName    
    }
}

function setUserId(userId){
    return{
        type: SET_USER_ID,
        userId: userId    
    }
}

function setJWToken(JWToken){
    return{
        type: SET_JWT_TOKEN,
        JWToken: JWToken    
    }
}

function createHideLoginError(){
    return{
        type: LOGIN_ERROR,
        loginError: '',
        loginErrorVisibility: 'hidden'
    }
}

function clearSensitiveinfo(){
    return{
        type: CLEAR_SENSITIVE_INFO,
    }
}

function changeMuiFlashMessageVisibility(value){
    return{
        type: SET_MUI_FLASH_MESSAGES_VISIBILITY,
        muiFlashMessageVisibility: value    
    } 
}
