import store from '../index.js';
export const createHeader = () => ({ 'JWToken': store.getState().loginSignUpReducer.JWToken });
