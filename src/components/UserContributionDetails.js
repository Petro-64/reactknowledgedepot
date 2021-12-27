import React from 'react'
import TopNavigation from './TopNavigation';
import Footer from './Footer';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/AdminContribution';
import UserEditContributionForm from "./forms/UserEditContributionForm";
import StyledUserContributionItem from '../styled/StyledUserContributionItem'


class UserContributionDetails extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  componentDidMount(){
    this.props.loadContributionItemUser(this.props.match.params.id);
  }

  componentDidUpdate(){}
 
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
    let { questionStatus, createdAt } = this.props.userContributionItem;
    let statusWord = questionStatus == 0 ? messages[this.props.language].pending : questionStatus == '1' ? messages[this.props.language].approved : messages[this.props.language].declined;
    return (
      <StyledUserContributionItem >
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <div>
            <TopNavigation logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
            <div className="container">
              <h2><FormattedMessage id="myConrtibutionDetails" /></h2>
              <h4 style={questionStatus == '0' ? {backgroundColor: '#efe756'} : questionStatus == '1' ? {backgroundColor: '#9dd49b', color: 'white !important'} : {backgroundColor: '#efc9c9', color: 'white !important'}}><FormattedMessage id="status" />: {statusWord}</h4><h4 className="second"><FormattedMessage id="creationDate" />: {createdAt}</h4>
              <UserEditContributionForm  language={this.props.language}  initialValues={this.props.userContributionItem}   backNavigation={this.backNavigation.bind(this)} />
            </div>
        </div> 
        <Footer logoutUser={this.props.logoutUser} userName={this.props.userName} roleId={this.props.roleId} ref={this.child} toggleLanguage={this.toggleLanguage} language={this.props.language}/>
      </IntlProvider>
     </StyledUserContributionItem>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.loginSignUpReducer, ...state.settingsReducer, ...state.contributionsReducer, ...state.usersReducer
  };
}

export default connect(mapStateToProps, actionCreators)(UserContributionDetails);