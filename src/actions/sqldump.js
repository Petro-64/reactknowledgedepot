import axios from 'axios';
import helpers from '../helpers/Helpers';
import { GET_SQL_DUMP } from '../types';
import store from '../index.js';
import  urls  from '../urls/index'; 

const BaseUrl = helpers.UrlSniffer();

export function loadSqlDump(){
    console.log("load sql dump");
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.get(BaseUrl + 'angular/mysqldump', {
            headers: headers
        })
        .then((response)=>{
            console.log(response)
            if( response.data ){//response.data.payload.success
                dispatch(setMysqlDump(response.data))
            } else {
                //dispatch(clearSensitiveinfo())
            };
        })
    }
}





function setMysqlDump(data){
    return{
        type: GET_SQL_DUMP,
        data: data    
    }
}

