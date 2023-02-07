import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';


import Test from './components/Test';
import Loginn from './components/LoginN';
import Users from './components/Users';
import Signup from './components/Signup';
import Resultsn from './components/Resultsn';
import Mistakes from './components/Mistakes';
import Subjects from './components/Subjects';
import AboutCookie from './components/AboutCookie'
import CookieConsent from './components/CookieConsent';
import PasswordReset from './components/PasswordReset';
import AdminSettings from './components/AdminSettings';
import ForgotPassword from './components/ForgotPassword';
import AccountSettings from './components/AccountSettings';
import FlashMessage from './components/formelements/FlashMessage';
import FeedbackButton from './components/formelements/FeedbackButton';
import MuiFlashMessage from './components/formelements/MuiFlashMessage';


import SpinningOverlay from './components/SpinningOverlay';
import AdminEditQuestion from './components/AdminEditQuestion';
import AdminAddQuestions from './components/AdminAddQuestions';
import AdminContribution from './components/AdminContribution';
import AdmineditQuestions from './components/AdmineditQuestions';
import AdminContributionDetails from './components/AdminContributionDetails';
import UserContributionDetails from './components/UserContributionDetails';
import AdminSearchQuestion from './components/AdminSearchQuestion';


import {createStore, applyMiddleware, combineReducers } from 'redux';
import rootSaga from './sagas';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import testReducer from "./reducers/testing";
import usersReducer from "./reducers/users";
import resultsReducer from "./reducers/results";
import settingsReducer from "./reducers/settings";
import commentsReducer from './reducers/comments';
import subjectsReducer from "./reducers/subjects";
import mistakesReducer from "./reducers/mistakes";
import questionsReducer from "./reducers/questions";
import loginSignUpReducer from "./reducers/loginsignup";
import AddMyQuestions from './components/AddMyQuestions';
import contributionsReducer from "./reducers/contribution";
import { composeWithDevTools } from 'redux-devtools-extension';
import MyQuestionsStatus from './components/MyQuestionsStatus';
import NonAuthorizedRoute from './components/authorization/NonAuthorized';
import AuthorizedRouteUser from './components/authorization/AuthorizedRouteUser';
import AuthorizedRouteAdmin from './components/authorization/AuthorizedRouteAdmin';
import { reducer as formReducer } from 'redux-form';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  testReducer,
  usersReducer,
  loginSignUpReducer,
  resultsReducer,
  subjectsReducer,
  settingsReducer,
  contributionsReducer,
  questionsReducer,
  commentsReducer,
  mistakesReducer,
  form: formReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, thunk)));
sagaMiddleware.run(rootSaga);

class App extends React.Component{
  render(){
    return(
        <Router>
          <div>
            <FeedbackButton/>
            <SpinningOverlay />
            <FlashMessage />
            <MuiFlashMessage />
            <CookieConsent />
            <Route exact path="/app" component={Home} />
            <NonAuthorizedRoute exact path="/app/test" component={Test}/>
            <NonAuthorizedRoute exact path="/app/resetpassword" component={PasswordReset} />
            <NonAuthorizedRoute exact path="/app/login" component={Loginn}/>
            <NonAuthorizedRoute exact path="/app/signup" component={Signup} />
            <NonAuthorizedRoute exact path="/app/forgotpassword" component={ForgotPassword} />
            <NonAuthorizedRoute exact path="/app/aboutcookie" component={AboutCookie}/>
 
            <AuthorizedRouteUser exact path="/app/resultsn" component={Resultsn} />
            <AuthorizedRouteUser exact path="/app/mistakes" component={Mistakes} />
            <AuthorizedRouteUser exact path="/app/test" component={Test} />
            <AuthorizedRouteUser exact path="/app/aboutcookie" component={AboutCookie}/>
            <AuthorizedRouteUser exact path="/app/addmyquestion" component={AddMyQuestions} />
            <AuthorizedRouteUser exact path="/app/myquestionstatus" component={MyQuestionsStatus} />
            <AuthorizedRouteUser exact path="/app/accountsettings" component={AccountSettings} />
            <AuthorizedRouteUser exact path="/app/mycontribution/:id" component={UserContributionDetails} />
 
            <AuthorizedRouteAdmin exact path="/app/users" component={Users} />
            <AuthorizedRouteAdmin exact path="/app/adminsettings" component={AdminSettings} />
            <AuthorizedRouteAdmin exact path="/app/subjects" component={Subjects} />
            <AuthorizedRouteAdmin exact path="/app/admincontribution" component={AdminContribution} />
            <AuthorizedRouteAdmin exact path="/app/admincontribution/:id" component={AdminContributionDetails} />
            <AuthorizedRouteAdmin exact path="/app/admineditquestions/:id" component={AdminEditQuestion} />
            <AuthorizedRouteAdmin exact path="/app/adminaddquestion" component={AdminAddQuestions} />
            <AuthorizedRouteAdmin exact path="/app/admineditquestion" component={AdmineditQuestions} />
            <AuthorizedRouteAdmin exact path="/app/adminsearchquestion" component={AdminSearchQuestion} />

          </div>
      </Router>
    )
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));

export default store;


