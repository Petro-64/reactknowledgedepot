import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Test from './components/Test';
import Login from './components/Login';
import Signup from './components/Signup';
import Users from './components/Users';
import Resultsn from './components/Resultsn';
import Subjects from './components/Subjects';
import AboutCookie from './components/AboutCookie'
import FlashMessage from './components/FlashMessage';
import CookieConsent from './components/CookieConsent';
import PasswordReset from './components/PasswordReset';
import AdminSettings from './components/AdminSettings';
import ForgotPassword from './components/ForgotPassword';
import AccountSettings from './components/AccountSettings';
import AdminContribution from './components/AdminContribution';
import AdminContributionDetails from './components/AdminContributionDetails';
import UserContributionDetails from './components/UserContributionDetails';

import {createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import testReducer from "./reducers/testing";
import usersReducer from "./reducers/users";
import resultsReducer from "./reducers/results";
import settingsReducer from "./reducers/settings";
import subjectsReducer from "./reducers/subjects";
import loginSignUpReducer from "./reducers/loginsignup";
import AddMyQuestions from './components/AddMyQuestions';
import contributionsReducer from "./reducers/contribution";
import { composeWithDevTools } from 'redux-devtools-extension';
import MyQuestionsStatus from './components/MyQuestionsStatus';
import NonAuthorizedRoute from './components/authorization/NonAuthorized';
import AuthorizedRouteUser from './components/authorization/AuthorizedRouteUser';
import AuthorizedRouteAdmin from './components/authorization/AuthorizedRouteAdmin';
import { reducer as formReducer } from 'redux-form';



const rootReducer = combineReducers({
  testReducer,
  usersReducer,
  loginSignUpReducer,
  resultsReducer,
  subjectsReducer,
  settingsReducer,
  contributionsReducer,
  form: formReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
//const store = createStore(rootReducer, applyMiddleware(thunk));


class App extends React.Component{
  render(){
    return(
        <Router>
          <div>
            <FlashMessage />
            <CookieConsent />
            <Route exact path="/app" component={Home} />
            <NonAuthorizedRoute exact path="/app/test" component={Test}/>
            <NonAuthorizedRoute exact path="/app/aboutcookie" component={AboutCookie}/>
            <NonAuthorizedRoute exact path="/app/resetpassword" component={PasswordReset} />
            <NonAuthorizedRoute exact path="/app/login" component={Login}/>
            <NonAuthorizedRoute exact path="/app/signup" component={Signup} />
            <NonAuthorizedRoute exact path="/app/forgotpassword" component={ForgotPassword} />
            <AuthorizedRouteAdmin exact path="/app/users" component={Users} />
            <AuthorizedRouteAdmin exact path="/app/adminsettings" component={AdminSettings} />
            <AuthorizedRouteAdmin exact path="/app/subjects" component={Subjects} />
            <AuthorizedRouteAdmin exact path="/app/admincontribution" component={AdminContribution} />
            <AuthorizedRouteAdmin exact path="/app/admincontribution/:id" component={AdminContributionDetails} />
            <AuthorizedRouteUser exact path="/app/resultsn" component={Resultsn} />
            <AuthorizedRouteUser exact path="/app/test" component={Test} />
            <AuthorizedRouteUser exact path="/app/addmyquestion" component={AddMyQuestions} />
            <AuthorizedRouteUser exact path="/app/myquestionstatus" component={MyQuestionsStatus} />
            <AuthorizedRouteUser exact path="/app/accountsettings" component={AccountSettings} />
            <AuthorizedRouteUser exact path="/app/mycontribution/:id" component={UserContributionDetails} />
          </div>
      </Router>
    )
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));

export default store;


