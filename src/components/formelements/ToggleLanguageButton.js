import React, { Component } from 'react';

class ToggleLanguageButton extends Component {
    toggleLanguage1 = () =>{
        this.props.language === 'en' ? this.props.toggleLanguage('ru') : this.props.toggleLanguage('en');
    }

    render() {
        return (
            <div onClick={this.toggleLanguage1.bind(this)} className="toggleLanguageButton">
                <div>
                    <span style={this.props.language === 'ru' ? {} : {display: 'none'}}>EN</span>
                    <span style={this.props.language === 'en' ? {} : {display: 'none'}}>RU</span>
                </div>
            </div>
        );
    }
}

export default ToggleLanguageButton;