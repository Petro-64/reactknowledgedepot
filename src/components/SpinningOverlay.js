import React from "react";
import StyledSpinningOverlay from '../styled/StyledSpinningOverlay';
import {connect} from 'react-redux';

class SpinningOverlay extends React.Component {
    render() {
        if(!this.props.spinnerOverlayVisibility){
            return null;
        }
        return <StyledSpinningOverlay>
                <div className="spinnerWrapper">
                    <div className="lds-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
               </StyledSpinningOverlay>
   }
}

const mapStateToProps=(state)=>{
    return {
        ...state.testReducer
    };
}
  
export default connect(mapStateToProps)(SpinningOverlay);
