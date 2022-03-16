import axios from 'axios';
import helpers from '../helpers/Helpers';
import urls from '../urls';
const BaseUrl = helpers.UrlSniffer();

export const getRateLimiterApi = () => {
    return axios.get(BaseUrl + urls.getRateLimiter); 
}