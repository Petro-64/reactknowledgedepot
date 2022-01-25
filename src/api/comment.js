import { createHeader } from './';
import axios from 'axios';
import helpers from '../helpers/Helpers';
import urls from '../urls';
const BaseUrl = helpers.UrlSniffer();

export const createComment = ({comment, route}) => {
    const headers = createHeader();
    return axios.post(BaseUrl + urls.addComments, {comment, route}, {headers}); 
}