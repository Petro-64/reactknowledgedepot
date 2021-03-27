import axios from 'axios';
import helpers from '../helpers/Helpers';
import { SET_USERS, CLEAR_SENSITIVE_INFO, SET_FLASH_MESSAGES_VISIBILITY, SET_FLASH_MESSAGES_MESSAGE, SET_FLASH_MESSAGES_TYPE } from '../types';
import store from '../index.js';

const BaseUrl = helpers.UrlSniffer();

export function loadUsers(){
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/users', {
            headers: headers
        })
        .then((response)=>{
            if(response.data.payload.success === "true"){
                dispatch(setUsers(response.data.payload.users))
            } else {
                dispatch(clearSensitiveinfo())
            };
        })
    }
}

export const deleteUser = ({id}) => {
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.delete(BaseUrl + 'react/deleteusers/'+ id,  {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                return axios.get(BaseUrl + 'react/users', {
                    headers: headers
                })
                .then((response)=>{
                    if(response.data.payload.success === "true"){
                        dispatch(setUsers(response.data.payload.users))
                        showFlashMessage(dispatch, 'User has been deleted successfully', 'success');
                    } else {
                        dispatch(clearSensitiveinfo())
                    };
                })
            } else {
                dispatch(clearSensitiveinfo())
            };
        })
        .catch(error => {
            dispatch(clearSensitiveinfo());
        });
    };
}

export const toggleuserconfirm = ({id}) => {
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/toggleuserconfirm/'+ id,  {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                return axios.get(BaseUrl + 'react/users', {
                    headers: headers
                })
                .then((response)=>{
                    if(response.data.payload.success === "true"){
                        dispatch(setUsers(response.data.payload.users))
                        showFlashMessage(dispatch, 'User has been confirmed successfully', 'success');
                    } else {
                        dispatch(clearSensitiveinfo())
                    };
                })
            } else {
                dispatch(clearSensitiveinfo())
            };
        })
        .catch(error => {
            dispatch(clearSensitiveinfo());
        });
    };
}

export const toggleusersuspend = ({id, reason}) => {
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/toggleusersuspended/' +  id + '/' + reason,  {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                return axios.get(BaseUrl + 'react/users', {
                    headers: headers
                })
                .then((response)=>{
                    if(response.data.payload.success === "true"){
                        dispatch(setUsers(response.data.payload.users))
                        showFlashMessage(dispatch, 'Users status has been changed successfully', 'success');
                    } else {
                        dispatch(clearSensitiveinfo())
                    };
                })
            } else {
                dispatch(clearSensitiveinfo())
            };
        })
        .catch(error => {
            dispatch(clearSensitiveinfo());
        });
    };
}

function setUsers(users){
    return{
        type: SET_USERS,
        users: users    
    }
}

function clearSensitiveinfo(){
    return{
        type: CLEAR_SENSITIVE_INFO,
    }
}

function showFlashMessage(dispatch, message, type){
    const timeout = store.getState().settingsReducer.flashMessagesTimeout;
    dispatch(changeFlashMessageVisibility(1));
    dispatch(changeFlashMessageMessage(message));
    dispatch(changeFlashMessageType(type));
    setTimeout(function(){ dispatch(changeFlashMessageVisibility(0)); }, timeout);
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