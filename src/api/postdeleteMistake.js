import { createHeader } from './';
import axios from 'axios';
import helpers from '../helpers/Helpers';
import urls from '../urls';
const BaseUrl = helpers.UrlSniffer();

export const postdeleteMistake = ({questionId}) => {
    const headers = createHeader();
    const data = questionId.id;
    return axios.post(BaseUrl + urls.postDeleteMistake, {questionId}, {headers: headers})
}