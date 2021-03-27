///
import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import StyledCookieConsent from '../styled/StyledCookieConsent'
import {withCookies} from 'react-cookie';
import messages from '../translations/CookieConsent';
import { IntlProvider, FormattedMessage } from "react-intl";
import { Link } from 'react-router-dom';


class CookieConsent extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    const mycookie = cookies.get('cookieConsentObtained')
    this.state = {
        cookieConsentObtained: mycookie
    };
  }

  componentDidMount(){
    setTimeout(() => { 
        if(!this.state.cookieConsentObtained && this.props.cookieConsentObtained == 0){/// this means that user came from email confirmation link
            this.props.setCookieConsentVisibility(1);
        };
    }, 5000);
  }

  componentDidUpdate(){
    if(this.props.cookieConsentObtained == 1){/// this means that user came from email confirmation link
        this.props.setCookieConsentVisibility(0);
    } 
  }

  hideConsent(){
    this.props.cookies.set("cookieConsentObtained", 'obtained', { path: '/', expires: new Date(Date.now()+22222592000)})  
    this.props.setCookieConsentVisibility(0);
  }

  render() {
    return (
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
            <StyledCookieConsent ifVisible={this.props.cookieConsentVisibility}>
                <div className="flashMessageBody">
                    <p className="message"><FormattedMessage id="consent" /></p>
                    <Link to="/app/aboutcookie"><FormattedMessage id="details" /></Link>
                    <button type="button" className="btn btn-success" onClick={this.hideConsent.bind(this)}><FormattedMessage id="agree" /></button>
                </div>
            </StyledCookieConsent>
        </IntlProvider>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    ...state.settingsReducer
  };
}

export default connect(mapStateToProps, actionCreators)(withCookies(CookieConsent));