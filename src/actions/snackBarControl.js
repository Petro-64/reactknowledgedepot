import { SET_MUI_FLASH_MESSAGES_VISIBILITY, SET_MUI_FLASH_MESSAGES_MESSAGE, SET_MUI_FLASH_MESSAGES_TYPE } from '../types';

export default function showMuiFlashMessage(dispatch, message, type){
    dispatch(changeMuiFlashMessageVisibility(1));
    dispatch(changeMuiFlashMessageMessage(message));
    dispatch(changeMuiFlashMessageType(type));
}

function changeMuiFlashMessageVisibility(value){
    return{
        type: SET_MUI_FLASH_MESSAGES_VISIBILITY,
        muiFlashMessageVisibility: value    
    } 
}

function changeMuiFlashMessageMessage(value){
    return{
        type: SET_MUI_FLASH_MESSAGES_MESSAGE,
        muiFlashMessageMessage: value    
    } 
}

function changeMuiFlashMessageType(value){
    return{
        type: SET_MUI_FLASH_MESSAGES_TYPE,
        muiFlashMessageType: value    
    } 
}
