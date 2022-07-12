import { put, call } from 'redux-saga/effects';
import { getRateLimiterApi } from '../api/ratelimiter';

export function* getRateLimiter() {
    try {
        const responceData = yield call(getRateLimiterApi);
        if (responceData.data.payload.success === 'true'){
            yield put({ type: 'SET_RATE_LIMITER', 
                commentRatelimiterComments: responceData.data.payload.commentRatelimiterComments, 
                commentRatelimiterHours: responceData.data.payload.commentRatelimiterHours,
                contributeRatelimiterHours: responceData.data.payload.contributeRatelimiterHours,
                contributeRatelimiterContributions: responceData.data.payload.contributeRatelimiterContributions,
                questionReportRatelimiterHours: responceData.data.payload.questionReportRatelimiterHours,
                questionReportRatelimiterReports: responceData.data.payload.questionReportRatelimiterReports
            })
        } else {
            alert("comments ratelimiter issue");
        }
    } catch(e){
        console.log(e);
    }
}