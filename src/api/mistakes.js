import { createHeader } from './';
import axios from 'axios';
import helpers from '../helpers/Helpers';
import urls from '../urls';
const BaseUrl = helpers.UrlSniffer();

export const getMistakes = () => {
    const headers = createHeader();
    return axios.get(BaseUrl + urls.mistakes, {headers: headers})
}