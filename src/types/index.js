export const LOGIN_SEND = 'LOGIN_SEND';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const HIDE_LOGIN_ERROR = 'HIDE_LOGIN_ERROR';
export const LOAD_SUBJECTS_ADMIN = 'LOAD_SUBJECTS_ADMIN';
export const LOAD_SUBJECTS_USER = 'LOAD_SUBJECTS_USER';
export const LOAD_USERS = 'LOAD_USERS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const ADMIN_ERROR = 'ADMIN_ERROR';
export const LOAD_RESULTS = 'LOAD_RESULTS';
export const USER_ERROR = 'USER_ERROR';
export const SET_CURRENT_SUBJECT_ID = 'SET_CURRENT_SUBJECT_ID';
export const SET_TESTING_SESSION_HASH = 'SET_TESTING_SESSION_HASH';
export const SET_CURRENT_SUBJECT_NAME = 'SET_CURRENT_SUBJECT_NAME';
export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const SET_ANSWERS = 'SET_ANSWERS';
export const SET_NUMBER_OF_ANSWERED = 'SET_NUMBER_OF_ANSWERED';
export const SET_NUMBER_OF_CORRECT = 'SET_NUMBER_OF_CORRECT';
export const SET_IF_REMAIN_QUESTIONS = 'SET_IF_REMAIN_QUESTIONS';
export const SET_USERS = 'SET_USERS';
//refactoring login logout//
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_ROLE_ID = 'SET_ROLE_ID';
export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';
export const SET_USER_ID = 'SET_USER_ID';
export const FULL_LOGOUT = 'FULL_LOGOUT';
// try to combine different reducers in one action
export const CLEAR_SENSITIVE_INFO = 'CLEAR_SENSITIVE_INFO';
// filter results subproject:
export const SET_RESULTS_FILTER_ACTIVE_SUBJECTS = 'SET_RESULTS_FILTER_ACTIVE_SUBJECTS';
export const SET_RESULTS_FILTERED = 'SET_RESULTS_FILTERED';
export const SET_RESULTS_FILTER_ITEMS_PAGE = 'SET_RESULTS_FILTER_ITEMS_PAGE';
export const SET_RESULTS_FILTER_NUMBER_OF_PAGINATIONS = 'SET_RESULTS_FILTER_NUMBER_OF_PAGINATIONS';
export const SET_RESULTS_FILTER_CURRENT_PAGINATION = 'SET_RESULTS_FILTER_CURRENT_PAGINATION';
export const SET_RESULTS_FILTER_SORTING_OPTION = 'SET_RESULTS_FILTER_SORTING_OPTION';
export const SET_CORRECT_ANSWER_ID = 'SET_CORRECT_ANSWER_ID';
export const SET_IF_TO_SHOW_TEST_HINTS_BORDER = 'SET_IF_TO_SHOW_TEST_HINTS_BORDER';
export const SET_IF_TO_SHOW_TEST_HINTS = 'SET_IF_TO_SHOW_TEST_HINTS';
//settings
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_FLASH_MESSAGES_VISIBILITY = 'SET_FLASH_MESSAGES_VISIBILITY';
export const SET_FLASH_MESSAGES_MESSAGE = 'SET_FLASH_MESSAGES_MESSAG';
export const SET_FLASH_MESSAGES_TYPE = 'SET_FLASH_MESSAGES_TYPE';
export const SET_GLOBAL_SETTINGS = 'SET_GLOBAL_SETTINGS';
export const SET_MUI_FLASH_MESSAGES_VISIBILITY = 'SET_MUI_FLASH_MESSAGES_VISIBILITY';
export const SET_MUI_FLASH_MESSAGES_MESSAGE = 'SET_MUI_FLASH_MESSAGES_MESSAGE';
export const SET_MUI_FLASH_MESSAGES_TYPE = 'SET_MUI_FLASH_MESSAGES_TYPE';
//signup
export const SET_SIGNUP_CAPTCHA_TEXT = 'SET_SIGNUP_CAPTCHA_TEXT';
export const SET_FAKE_CAPTCHA_TEXT = 'SET_FAKE_CAPTCHA_TEXT';//when recaptcha is disabled, we set fake recaptcha text to aviod signup form validation error for recaptcha field
////cookie consent
export const SET_COOKIE_CONSENT_VISIBILITY = 'SET_COOKIE_CONSENT_VISIBILITY';
export const SET_COOKIE_CONSENT_OBTAINED = 'SET_COOKIE_CONSENT_OBTAINED';
//suspended account
export const SET_SUSPENSION_REASON = 'SET_SUSPENSION_REASON';
//reset password functionality
export const SET_REDIRECT_FLAG_FOR_RESET_PASWORD_FUNCTION = 'SET_REDIRECT_FLAG_FOR_RESET_PASWORD_FUNCTION';
/// my contribution functionality
export const SET_CURRENT_CONTRIBUTION_SUBJECT_ID = 'SET_CURRENT_CONTRIBUTION_SUBJECT_ID';
export const SET_CURRENT_CONTRIBUTION_SUBJECT_NAME = 'SET_CURRENT_CONTRIBUTION_SUBJECT_NAME';
export const SENT_MY_CONTRIBUTION = 'SENT_MY_CONTRIBUTION'; 
export const SET_ADMIN_CONTRIBUTION = 'SET_ADMIN_CONTRIBUTION';
export const SET_CONTRIBUTION_CONTENT = 'SET_CONTRIBUTION_CONTENT';
export const SET_REDIRECT_FLAG_FORADMIN = 'SET_REDIRECT_FLAG_FORADMIN';//will redirect to contributions page from contribution item page
export const SET_USER_CONTRIBUTION = 'SET_USER_CONTRIBUTION';
export const SET_USER_CONTRIBUTION_ITEM = 'SET_USER_CONTRIBUTION_ITEM';
///edit questions block
export const SET_CURRENT_SUBJECT_ID_TO_ADD_QUESTION = 'SET_CURRENT_SUBJECT_ID_TO_ADD_QUESTION'; // to be able to add question
export const SET_CURRENT_SUBJECT_NAME_TO_ADD_QUESTION = 'SET_CURRENT_SUBJECT_NAME_TO_ADD_QUESTION'; // to be able to add question
export const SET_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT = 'SET_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT'; 
export const SET_NUMBER_OF_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT = 'SET_NUMBER_OF_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT'; 
export const SET_CURRENT_PAGINATION_QUESTIONS_BY_SUBJECT = 'SET_CURRENT_PAGINATION_QUESTIONS_BY_SUBJECT'; 
export const SET_PAGINATED_QUESTIONS = 'SET_PAGINATED_QUESTIONS';
export const SET_QUESTIONS_TO_EDIT_STATUS = 'SET_QUESTIONS_TO_EDIT_STATUS';// to be able to see all, active or unactive questions to edit
export const SET_ANSWERS_FOR_QUESTION_ID = 'SET_ANSWERS_FOR_QUESTION_ID';// 
export const SET_ADMIN_EDIT_QUESTION_ITEM = 'SET_ADMIN_EDIT_QUESTION_ITEM';// this will be a set of question and answers
export const SET_CURRENT_SUBJECT_NAME_FOR_QUESTION_EDIT = 'SET_CURRENT_SUBJECT_NAME_FOR_QUESTION_EDIT'; 
export const SET_REDIRECT_FLAG_TO_BACK_TO_QUESTIONS_LIST = 'SET_REDIRECT_FLAG_TO_BACK_TO_QUESTIONS_LIST'; // reproduce similar functionality from contribution blick
export const PUSH_EDITED_QUESTION_ID_TO_ARRAY_TO_BE_ABLE_TO_SEE_RECENTLY_EDITED_QUESTIONS = 'PUSH_EDITED_QUESTION_ID_TO_ARRAY_TO_BE_ABLE_TO_SEE_RECENTLY_EDITED_QUESTIONS'; 
export const CLEAR_EDITED_QUESTIONS_LIST = 'CLEAR_EDITED_QUESTIONS_LIST';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const SET_OVERLAY_VISIBILITY = 'SET_OVERLAY_VISIBILITY';
export const SET_CURRENT_QUESTION_ID = 'SET_CURRENT_QUESTION_ID';














