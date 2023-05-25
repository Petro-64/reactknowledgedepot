import { createHeader } from './';
import axios from 'axios';
import helpers from '../helpers/Helpers';
import urls from '../urls';
const BaseUrl = helpers.UrlSniffer();

export const deleteMistake = (id, uId) => {
    const headers = createHeader();
    return axios.delete(BaseUrl + urls.deleteMistake + id + '/' + uId, {headers: headers})
}