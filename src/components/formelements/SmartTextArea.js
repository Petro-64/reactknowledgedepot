import React, { Component } from 'react';

class SmartTextArea extends Component {

    render() {
        const { input, label, type, disabled, meta: { touched, error, warning } } = this.props;
        let color='';
        if(input.value.length > 1000){ color = "red"; } else {color = "green";}
        return (
            <>
            <label style={{marginBottom: "0", fontSize: "12px"}}>{label}</label>
            <div>
                
            <div style={{display: "inline-block", width: "100%"}}>
              <textarea {...input} placeholder={label} type={type} rows="4" disabled={disabled} style={{width: "calc(100% - 30px)"}}></textarea>
              <br />
              <span style={{fontWeight: "bold", color: color}}>&nbsp;&nbsp;{input.value.length}</span>
              {touched &&
                ((error && <span className="error">{error}</span>) ||
                  (warning && <span>{warning}</span>))}
            </div>
          </div>
          </>
        );
        }
}
  export default SmartTextArea;