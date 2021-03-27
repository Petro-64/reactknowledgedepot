import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: true,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label);
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
                type="checkbox"
                value={label}
                checked={isChecked}
                onChange={this.toggleCheckboxChange}
            />&nbsp;
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;