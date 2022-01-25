import { createHeader } from './';
import axios from 'axios';
import helpers from '../helpers/Helpers';
import urls from '../urls';
const BaseUrl = helpers.UrlSniffer();

export const sendContributionSaga = ({question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId}) => {
    const headers = createHeader();
    return axios.post(BaseUrl + urls.addContribution, {question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId}, {headers}); 
}