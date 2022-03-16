import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

class ModalMUI extends React.Component {
    state = {
        show: false
    };

    showModal = () => {
        this.setState({
            show: true
        });
    };

    hideModal = e => {
        this.setState({
            show: false
        });
    };

    clickYes = () => {
        this.setState({
            show: false
        });
        this.props.toExecute();
    }

    handleChildClick = (e) => {
        e.stopPropagation();
    }

    handleClose = () =>{
        this.setState({
            show: false
        });
    }

    render() {
        return (
            <Dialog open={this.state.show} onClose={this.handleClose.bind(this)} >
                <DialogTitle>{this.props.messages.pleaseConfirmTestStop}</DialogTitle>
                <DialogContent>
                <div style={{ width: '100%' }}>
                    <Box display="flex" flexDirection="row" p={0} m={0}>
                        <Tooltip title={this.props.messages.stopTesting}>
                            <Box sx={{ p: 0, mt: 0.25 }}>
                                <Button variant="contained" color="error" onClick={this.clickYes.bind(this)}>
                                    {this.props.messages.stopTesting}
                                </Button>
                            </Box>
                        </Tooltip>
                        <div style={{ width: '100%' }}>
                        <Box display="flex" flexDirection="row-reverse" p={0} m={0}>
                            <Tooltip title={this.props.messages.backToTest}>
                                <Box sx={{ p: 0, mt: 0.25 }}>
                                    <Button variant="contained"  onClick={this.hideModal.bind(this)}>
                                        {this.props.messages.backToTest}
                                    </Button>
                                </Box>
                            </Tooltip>
                        </Box>
                        </div>
                    </Box>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}


export default ModalMUI;