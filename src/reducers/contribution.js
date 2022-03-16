import { SET_CURRENT_CONTRIBUTION_SUBJECT_ID, SET_CURRENT_CONTRIBUTION_SUBJECT_NAME,  
    SET_ADMIN_CONTRIBUTION, SET_CONTRIBUTION_CONTENT, SET_REDIRECT_FLAG_FORADMIN, SET_USER_CONTRIBUTION, SET_USER_CONTRIBUTION_ITEM, CLEAR_SENSITIVE_INFO } from '../types'


let contributionState={
    contributionSubjectId: '',
    contributionSubjectName: '',
    adminContribution: '',/// set of all contributions 
    adminContributionItem: '',///particular contributions id 
    redirectAfterSuccesfullAdministeringForAdmin: 1,  /// if 2, will redirect to contributions page from contribution item page
    userContribution: '',/// set of all contributions for given user 
    userContributionItem: '',///particular contributions for given user
    contributionRateLimiterHours: 0,
    contributionRateLimiterQuantity: 0
}

const contributionsReducer = (state=contributionState, action)=>{
    switch (action.type){

    case SET_CURRENT_CONTRIBUTION_SUBJECT_ID:
        return {
            ...state,
            contributionSubjectId: action.subjectId,
        } 

    case 'SET_RATE_LIMITER':
        return {
            ...state,
            contributionRateLimiterHours: action.contributeRatelimiterHours,
            contributionRateLimiterQuantity: action.contributeRatelimiterContributions
        } 

    case SET_CURRENT_CONTRIBUTION_SUBJECT_NAME:
        return {
            ...state,
            contributionSubjectName: action.subjectName,
        } 

    case SET_ADMIN_CONTRIBUTION:
        return {
            ...state,
            adminContribution: action.contributionAdminResults,
        } 

    case SET_CONTRIBUTION_CONTENT:
        return {
            ...state,
            adminContributionItem: action.contributionAdminItemResults,
        }

    case SET_REDIRECT_FLAG_FORADMIN:
        return {
            ...state,
            redirectAfterSuccesfullAdministeringForAdmin: action.redirectFlagForAdmin,
        }

    case SET_USER_CONTRIBUTION:
        return {
            ...state,
            userContribution: action.userContribution,
        }

    case SET_USER_CONTRIBUTION_ITEM:
        return {
            ...state,
            userContributionItem: action.contributionUserItemResults,
        }

    case CLEAR_SENSITIVE_INFO:
        return{
            ...state,
            userContributionItem: '',
            userContribution: '',
            adminContributionItem: '',
            adminContribution: 0,
        }

    default: 
        return {
            ...state
        }
    }
} 

export default contributionsReducer;

