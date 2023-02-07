import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/index';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

class MuiFlashMessage extends React.Component {

componentDidUpdate(){
    if(this.props.muiFlashMessageVisibility === 1){
        const that = this;
        setTimeout(function(){ that.props.setMuiFlashVisibility(0); }, that.props.muiFlashMessagesTimeout);
    };
}

render() {
   let severity = "success";
   if(!!this.props.muiFlashMessagesType){
    severity = this.props.muiFlashMessagesType;
   }

   let open = false;

   if(this.props.muiFlashMessageVisibility === 1){
    open = true;
   }

    return (
        <Snackbar open={open} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert  severity={severity} sx={{ width: '100%' }} >
                {this.props.muiFlashMessagesMessage1}
            </Alert>
        </Snackbar>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.settingsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(MuiFlashMessage);