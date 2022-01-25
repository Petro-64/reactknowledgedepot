import React from 'react';
import StyledFeedbackButton from '../styled/StyledFeedbackButton';
import { IntlProvider, FormattedMessage } from "react-intl";
import AddCommentForm from './forms/AddCommentForm';
import messages from '../translations/forms/AddCommentForm';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import { formValueSelector } from 'redux-form';

class FeedbackButton extends React.Component {
    constructor() {
        super();
        this.state = { visib: 'none'};
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

    clickSend = () => {
        this.setState({visib: 'none'});
    }

    handleChildClick = (e) => {
        e.stopPropagation();
    }

    render() {
        const { language, comment } = this.props;
        const route = window.location.href.substring(window.location.href.indexOf("/app"));

        return (
            <IntlProvider locale={language} messages={messages[this.props.language]}>
                <StyledFeedbackButton  visib={this.state.visib} style={(this.props.roleId === 1 || this.props.roleId === 2) ? {} : {display: 'none'}}>
                    <button className="btn btn-primary btn-sm rotated" onClick={this.showModal.bind(this)}>How are we doing?</button>
                    <div className="overlay" onClick={this.hideModal.bind(this)}>
                        <div className="winWrapper" onClick={this.handleChildClick.bind(this)}>
                            <div className="modalHeader"></div>
                            <div className="modalBody">
                                <p className="bodyText"><FormattedMessage id="addFeedback" /></p>
                                <AddCommentForm onSubmit={()=>{this.props.postComment({comment, route});}} language={this.props.language} cancell={this.hideModal.bind(this)}/>
                            </div>
                        </div>
                    </div>
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

