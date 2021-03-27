import React from "react";
import StyledModal from '../styled/StyledModal'



class Modal extends React.Component {
    state = {
        show: false
    };

    showModal = e => {
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

    render() {

    if(!this.state.show){
        return null;
    }

    return <StyledModal onClick={this.hideModal.bind(this)}>
                <div className="winWrapper" onClick={this.handleChildClick.bind(this)}>
                    <div className="modalHeader">
                        {this.props.titlle}
                    </div>
                    <div className="modalBody">
                        <p className="bodyText">{this.props.message}</p>
                        <button type="button" className="btn btn-danger" onClick={this.hideModal.bind(this)}>Cancel</button>
                        <button type="button" className="btn btn-success" onClick={this.clickYes.bind(this)}>Yes</button>
                    </div>
                </div>
            </StyledModal>;
    }
}


export default Modal;