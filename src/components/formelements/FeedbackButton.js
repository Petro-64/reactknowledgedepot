import React from 'react';
import StyledFeedbackButton from '../../styled/StyledFeedbackButton';
import { IntlProvider, FormattedMessage } from "react-intl";
import AddCommentForm from './../forms/AddCommentForm';
import messages from '../../translations/forms/AddCommentForm';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/index';
import { formValueSelector } from 'redux-form';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

class FeedbackButton extends React.Component {
    constructor() {
        super();
        this.state = { visib: 'none', open: false};
      }

    showModal = () => {
        this.setState({
            visib: 'block'
        });
    };

    hideModal = () => {
        this.setState({
            visib: 'none'
        });
    };

    componentDidMount(){
        this.props.getRatelimiterSettings();// to be able to show proper message about rate limits
    }

    clickSend = () => {
        this.setState({visib: 'none'});
    }

    handleChildClick = (e) => {
        e.stopPropagation();
    }

    handleClose = () =>{
        this.setState({
            open: false
        });
    }

    handleClickOpen = () =>{
        this.setState({
            open: true
        });
    }

    render() {
        const { language, comment } = this.props;
        const route = window.location.href.substring(window.location.href.indexOf("/app"));

        return (
            <IntlProvider locale={language} messages={messages[this.props.language]}>
                <StyledFeedbackButton  visib={this.state.visib} style={(this.props.roleId === 1 || this.props.roleId === 2) ? {} : {display: 'none'}}>
                    <button className="btn btn-primary btn-sm rotated" style={(language === 'en') ? {} : {right: '-55px'}} onClick={this.handleClickOpen.bind(this)}><FormattedMessage id="howAreWeDoing"/></button>
                    <Dialog open={this.state.open} onClose={this.handleClose.bind(this)}>
                        <DialogTitle><FormattedMessage id="addFeedback" /></DialogTitle>
                        <DialogContent>
                            <FormattedMessage id="maximumNumberOfComments" />: {this.props.commentRateLimiterQuantity}<FormattedMessage id="perDay" />
                            <AddCommentForm onSubmit={()=>{this.props.postComment({comment, route});}} language={this.props.language} cancell={this.handleClose.bind(this)}/>
                        </DialogContent>
                    </Dialog>
                </StyledFeedbackButton>
            </IntlProvider>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        ...state.commentsReducer, ...state.loginSignUpReducer, ...state.settingsReducer
    };
}

const selector = formValueSelector('addCommentFormRedux');

FeedbackButton = connect(
state => {
    const comment = selector(state, 'comment')
    return {
    comment,
    }
}
)(FeedbackButton)  


export default connect(mapStateToProps, actionCreators)(FeedbackButton);

