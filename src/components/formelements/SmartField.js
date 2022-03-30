import React, { Component } from 'react';

class SmartField extends Component {
    constructor () {
        super()
        this.state = {
            isHidden: false,
            password: ''
        }
    }

    togglePasswordVisibility() {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    render() {
    const { input, label, toShowPasswordMeter, meta: { touched, error, warning, dirty } } = this.props;
    let word, color, width = '';  
    if(input.value.length <= 8){
        word = "very weak"; color = "Crimson"; width="70px"
    } else if (input.value.length <= 10){
        word = "weak"; color="DarkOrange"; width="100px"
    } else if (input.value.length <= 12){
        word = "strong"; color="DarkSeaGreen"; width="130px"
    } else {
        word = "very strong"; color="Green"; width="160px"
    }
    return (
        <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type='text' style={this.state.isHidden ? {} : {display: 'none'}} />
            <input {...input} placeholder={label} type='password' style={this.state.isHidden ? {display: 'none'} : {}} />
            <span onClick={this.togglePasswordVisibility.bind(this)}>&nbsp;&nbsp;&nbsp;<i className="fa fa-eye" aria-hidden="true" style={this.state.isHidden ? {} : {opacity: 0.5}}></i></span>
            {touched &&  ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
            <div style={{height: "19px", padding: 0, marginTop: "4px"}}>{(dirty && toShowPasswordMeter) &&  <div style={{width: width, padding: "0 5px", backgroundColor: color, color: "#fff", fontSize: "12px"}}>{word}</div>}</div>
        </div>
        </div>
    );
    }
}

export default SmartField;