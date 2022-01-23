import React, { Component } from 'react';
import StyledFeedbackButton from '../styled/StyledFeedbackButton';
import { IntlProvider, FormattedMessage } from "react-intl";
import AddCommentForm from './forms/AddCommentForm';
import messages from '../translations/forms/AddContributionForm';
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
        return (
            <IntlProvider locale={language} messages={messages[this.props.language]}>
                <StyledFeedbackButton  visib={this.state.visib}>
                    <button className="btn btn-primary btn-sm rotated" onClick={this.showModal.bind(this)}>How are we doing?</button>
                    <div className="overlay" onClick={this.hideModal.bind(this)}>
                        <div className="winWrapper" onClick={this.handleChildClick.bind(this)}>
                            <div className="modalHeader">
                                {this.props.titlle}
                            </div>
                            <div className="modalBody">
                                <p className="bodyText">{'Add your feedback'}</p>
                                <AddCommentForm onSubmit={()=>{this.props.postComment(comment);}} language={this.props.language} cancell={this.hideModal.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </StyledFeedbackButton>
            </IntlProvider>
        );
    }
}

const mapStateToProps=(state)=>{
    //const comment = selector(state, 'comment');
    return {
      ...state.commentsReducer
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

