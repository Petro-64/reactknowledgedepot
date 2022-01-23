import { createHeader } from './';
import axios from 'axios';
import helpers from '../helpers/Helpers';
import urls from '../urls';
const BaseUrl = helpers.UrlSniffer();

export const sendContributionSaga = ({question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId}) => {
    const headers = createHeader();
    return axios.post(BaseUrl + urls.addContribution, {question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId}, {headers}); 
}



//url : addContribution
/*
export const sentMyContribution = () => {
    const question = store.getState().form.addContibutionFormRedux.values.question;
    const firstAnswer = store.getState().form.addContibutionFormRedux.values.firstAnswer;
    const secondAnswer = store.getState().form.addContibutionFormRedux.values.secondAnswer;
    const thirdAnswer = store.getState().form.addContibutionFormRedux.values.thirdAnswer;
    const fourthAnswer = store.getState().form.addContibutionFormRedux.values.fourthAnswer;
    const subjectId = store.getState().contributionsReducer.contributionSubjectId;
    
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    const timeout = store.getState().settingsReducer.flashMessagesTimeout;
    const translations = {
        questionAddSuccess:  store.getState().settingsReducer.language === 'en' ? messages.en.questionAddSuccess : messages.ru.questionAddSuccess,
    }
    return (dispatch) => {
        return axios.post(BaseUrl + 'react/addmycontribution', { question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId }, {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                dispatch(reset('addContibutionFormRedux'));
                dispatch(changeFlashMessageVisibility(1));
                dispatch(changeFlashMessageMessage(translations.questionAddSuccess));
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




*/