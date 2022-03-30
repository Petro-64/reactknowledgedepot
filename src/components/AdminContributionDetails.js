import React from 'react'
import MaterialUiNavigation from './MaterialUiNavigation';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/AdminContribution';
import AdminEditContributionForm from "./forms/AdminEditContributionForm";


class AdminContributionDetails extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  componentDidMount(){
    this.props.loadContributionItemAdmin(this.props.match.params.id);
  }


  componentDidUpdate(){
    if(this.props.redirectAfterSuccesfullAdministeringForAdmin === 2){/// this means that user came from email confirmation link
      this.props.history.push('/app/admincontribution');
    };
  }
 
  backNavigation(){
    this.props.history.push('/app/admincontribution');
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
          <MaterialUiNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
          <div className="container">
            <h2><FormattedMessage id="editContibution" /></h2>
            <h4><FormattedMessage id="subject" />:&nbsp;{this.props.adminContributionItem.subjectName}</h4>
            <h4><FormattedMessage id="userName" />:&nbsp;{this.props.adminContributionItem.userName}</h4>
            <AdminEditContributionForm  onSubmit={()=>{this.props.saveContributionAdmin()}} language={this.props.language}  
            declineFunction={this.props.declineContributionAdmin} initialValues={this.props.adminContributionItem}  backNavigation={this.backNavigation.bind(this)} showAllButtons={true}  />
          </div>
      </div> 
     </IntlProvider>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.loginSignUpReducer, ...state.settingsReducer, ...state.contributionsReducer, ...state.usersReducer
  };
}

export default connect(mapStateToProps, actionCreators)(AdminContributionDetails);