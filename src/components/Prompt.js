import React from "react";
import StyledModal from '../styled/StyledModal'



class Prompt extends React.Component {
    state = {
        show: false,
        value: ''
    };

    showModal = e => {
        this.setState({
            show: true
        });
    };

    onChange = e =>{
        this.setState({
            value: e.target.value
        });
    }

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
                        <textarea id="w3review" name="w3review" rows="2" cols="30" onChange={this.onChange.bind(this)} placeholder="required"></textarea>
                        <p className="bodyText">{this.props.message}</p>
                        <button type="button" className="btn btn-danger" onClick={this.hideModal.bind(this)}>Cancel</button>
                        <button type="button" className="btn btn-success" onClick={this.clickYes.bind(this)} disabled={this.state.value.length == 0}>Yes</button>
                    </div>
                </div>
            </StyledModal>;
    }
}


export default Prompt;