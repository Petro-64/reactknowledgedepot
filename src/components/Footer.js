import React from 'react'
import { Link } from 'react-router-dom';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/TopNavigation';
import $ from 'jquery';

class TopNavigation extends React.Component {
    constructor () {
        super()
        this.state = {
        }
    }

    componentDidMount(){
    }

    logoutUser (){
        this.props.logoutUser();
        this.setState({
            isLogoutHidden: true
        })
    }

    toggleLanguage(e){
        this.props.toggleLanguage(e.target.value);
    }

    render() {
        return (
            <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
                    <footer className="text-center text-md-start text-white navbar-expand-lg">
                    <nav className="navbar">
                        <ul className="navbar-nav mr horizontal" >
                            <li className="nav-item active">
                                <Link className="nav-link" to="/app">
                                <i className="fa fa-home"></i>
                                </Link>
                            </li>
                            <li className="nav-item active" style={(this.props.roleId !== 4) ? {} : {display: 'none'}}>
                                <Link className="nav-link" to="/app/test">
                                    <FormattedMessage id="test" />
                                </Link>
                            </li>
                            <li className="nav-item active" style={(this.props.roleId !== 0 && this.props.roleId !== 4) ? {} : {display: 'none'}}>
                                <Link className="nav-link" to="/app/resultsn">
                                    <FormattedMessage id="testResults" />
                                </Link>
                            </li>
                            <li className="nav-item active" style={(this.props.roleId !== 0 && this.props.roleId !== 4) ? {} : {display: 'none'}}>
                                <Link className="nav-link" to="/app/accountsettings">
                                    <FormattedMessage id="settings" />
                                </Link>
                            </li>
                            <li className="nav-item active" style={this.props.roleId === 0 ? {} : {display: 'none'}}>
                                <Link className="nav-link" to="/app/login">
                                    <FormattedMessage id="login" />
                                </Link>
                            </li> 
                            <li className="nav-item active" style={this.props.roleId === 0 ? {} : {display: 'none'}}>
                                <Link className="nav-link" to="/app/signup">
                                    <FormattedMessage id="register" />
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mr horizontal">
                            <li>
                                <Link className="nav-link" to="/app/">
                                    © 2020 Copyright: Petro Niemkov
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    </footer>
            </IntlProvider>
        )
    }
}
export default TopNavigation

