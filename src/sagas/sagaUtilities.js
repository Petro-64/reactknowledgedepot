import { put, all, delay } from 'redux-saga/effects';

export function* showHideSpinnerAndMessage(overlayVisibility, message, flashVisibility, flashType){
    yield all([
        put({ type: 'SET_OVERLAY_VISIBILITY', visibility: overlayVisibility }),
        put({ type: 'SET_MUI_FLASH_MESSAGES_MESSAGE', muiFlashMessageMessage: message}),
        put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: flashVisibility}),
        put({ type: 'SET_MUI_FLASH_MESSAGES_TYPE', muiFlashMessageType: flashType}),
    ])
    yield delay(3000);
    yield put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 0});
}