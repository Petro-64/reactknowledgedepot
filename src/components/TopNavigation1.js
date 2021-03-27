import React from 'react'
import { Link } from 'react-router-dom';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/TopNavigation';

class TopNavigation extends React.Component {
    constructor () {
        super()
        this.state = {
        }
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
                <nav className="navbar navbar-dark navbar-expand-md sticky-top" style={{ backgroundColor: "#00549a !important" }}>
                    <Link className="navbar-brand" to="/app">
                        <i className="fa fa-home"></i>
                    </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active" style={this.props.roleId === 0 ? {} : {display: 'none'}}>
                            <Link className="nav-link" to="/app/test">
                                <FormattedMessage id="test" />
                            </Link>
                        </li>
                        <li className="nav-item dropdown active" style={(this.props.roleId === 1 || this.props.roleId === 2) ? {} : {display: 'none'}}>
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>
                                    <FormattedMessage id="test" />
                                </span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown1">
                                <Link className="dropdown-item" to="/app/test">
                                    <FormattedMessage id="test" />
                                </Link>
                                <Link className="dropdown-item" to="/app/resultsn">
                                    <FormattedMessage id="testResults" />
                                </Link>
                            </div>
                        </li>

                        <li className="nav-item active dropdown"style={(this.props.roleId === 1 || this.props.roleId === 2) ? {} : {display: 'none'}}>
                            <a className="nav-link dropdown-toggle" href ="#" id="navbarDropdown11" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>
                                    <FormattedMessage id="settings" />
                                </span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown11">
                                <Link className="dropdown-item" to="/app/accountsettings">
                                    <FormattedMessage id="settings" />
                                </Link>
                            </div>
                        </li>

                        <li className="nav-item active dropdown" style={(this.props.roleId === 1 || this.props.roleId === 2) ? {} : {display: 'none'}} >
                            <a className="nav-link dropdown-toggle" href ="#" id="navbarDropdown12" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>
                                    <FormattedMessage id="contibute" />
                                </span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown12">
                                <Link className="dropdown-item" to="/app/addmyquestion">
                                    <FormattedMessage id="makeContribution" />
                                </Link>
                                <Link className="dropdown-item" to="/app/myquestionstatus">
                                    <FormattedMessage id="myContrributionStatus" />
                                </Link>
                            </div>
                        </li>

                        <li className="nav-item active dropdown" style={this.props.roleId === 2 ? {} : {display: 'none'}}>
                            <a className="nav-link dropdown-toggle" href ="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span>
                                    <FormattedMessage id="admin" />
                                </span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                <Link className="dropdown-item" to="/app/users">
                                    <FormattedMessage id="users" />
                                </Link>
                                <Link className="dropdown-item" to="/app/subjects">
                                    <FormattedMessage id="subjects" />
                                </Link>
                                <Link className="dropdown-item" to="/app/adminsettings">
                                    Global settings
                                </Link>
                                <Link className="dropdown-item" to="/app/admincontribution">
                                    Contribution
                                </Link>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto" style={this.props.roleId === 0 ? {} : {display: 'none'}}>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/app/login">
                                <FormattedMessage id="login" />
                            </Link>
                        </li> 
                        <li className="nav-item active">
                            <Link className="nav-link" to="/app/signup">
                                <FormattedMessage id="register" />
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav mi-auto" style={this.props.roleId === 0 ? {display: 'none'} : {}}>                            
                        <li className="nav-item active dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown2" data-toggle="dropdown">
                                <span>
                                    <FormattedMessage id="hi" />{this.props.userName}
                                </span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                <a className="dropdown-item" href="#" onClick={this.logoutUser.bind(this)}>
                                    <FormattedMessage id="logout" />
                                </a>
                            </div>
                        </li>
                    </ul>
                    <select onChange={this.toggleLanguage.bind(this)} value={this.props.language} className="languageSelect form-select">
                        <option id="en">en</option>
                        <option id="ru">ru</option>
                    </select>
                </div>
                </nav>
            </IntlProvider>
        )
    }
}
export default TopNavigation

