import React, { Component } from 'react';

class Select extends Component {
  render() {
    const { options, onChange, defaultt } = this.props;
    return (
    <div className="select">
        <select className="form-control" onChange={onChange}   value={defaultt}>
            { options.map((value) => ( <option key={value.id} value={value.id}>{value.value}</option>)) }
        </select>
    </div>
    );
  }
}

export default Select;