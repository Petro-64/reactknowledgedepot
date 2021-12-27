import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import StyledFlashMessage from '../styled/StyledFlashMessage'


class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <StyledFlashMessage ifVisible={this.props.flashMessagesVisibility} bGcolorr = {this.props.flashMessagesType}>
            <div className="flashMessageBody">
                <p>{this.props.flashMessagesMessage}</p>
            </div>
        </StyledFlashMessage>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.settingsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(FlashMessage);