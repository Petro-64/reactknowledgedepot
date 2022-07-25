import { createHeader } from './';
import axios from 'axios';
import helpers from '../helpers/Helpers';
import urls from '../urls';
const BaseUrl = helpers.UrlSniffer();

export const searchQuestionsByKeyApi = ({questionsearchkeyword}) => {
    const headers = createHeader();
    return axios.get(BaseUrl + urls.searchQuestionByKey + '/' + questionsearchkeyword, {headers}); 
}