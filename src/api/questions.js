import { createHeader } from './';
import axios from 'axios';
import helpers from '../helpers/Helpers';
import urls from '../urls';
const BaseUrl = helpers.UrlSniffer();

export const editQuestionPost = ({editedValues}) => {
    const headers = createHeader();
    return axios.post(BaseUrl + urls.adminEditQuestion, {
        answerCorrect: editedValues.answerCorrect, 
        correctId: editedValues.correctId, 
        question: editedValues.question, 
        questionId: editedValues.questionId, 
        uncorrect0: editedValues.uncorrect0, 
        uncorrect1: editedValues.uncorrect1, 
        uncorrect2: editedValues.uncorrect2, 
        uncorrectId0: editedValues.uncorrectId0, 
        uncorrectId1: editedValues.uncorrectId1, 
        uncorrectId2: editedValues.uncorrectId2, 
        subjectId: editedValues.subjectId,
    }, {headers}); 
}

export const getQuestionsBySubjectAndStatus = ({currentSubjId, currentStatus}) => {
    const headers = createHeader();
    return axios.get(BaseUrl + 'react/questions/' + currentSubjId + '/' + currentStatus, {headers: headers})
}