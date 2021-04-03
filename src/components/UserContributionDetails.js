import React from 'react'
import TopNavigation from './TopNavigation';
import Footer from './Footer';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/AdminContribution';
import UserEditContributionForm from "./forms/UserEditContributionForm";


class UserContributionDetails extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  componentDidMount(){
    this.props.loadContributionItemUser(this.props.match.params.id);
  }


  componentDidUpdate(){

  }
 
  backNavigation(){
    this.props.history.push('/app/myquestionstatus');
  }

  handleChange = (e) =>{
    this.setState({question: e.target.value});
  }

  toggleLanguage = (lang) =>{
    this.props.setLanguage(lang);
  }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <div>
          <TopNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
          <div className="container">
            <h2><FormattedMessage id="myConrtibutionDetails" /></h2>
            <UserEditContributionForm  language={this.props.language}  initialValues={this.props.userContributionItem}   backNavigation={this.backNavigation.bind(this)} />
          </div>
      </div> 
      <Footer logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
     </IntlProvider>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.loginSignUpReducer, ...state.settingsReducer, ...state.contributionsReducer, ...state.usersReducer
  };
}

export default connect(mapStateToProps, actionCreators)(UserContributionDetails);