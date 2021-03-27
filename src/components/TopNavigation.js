import React from 'react'
import { Link } from 'react-router-dom';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/TopNavigation';

class TopNavigation extends React.Component {
    constructor () {
        super()
        this.state = {
            isHidden: true,
            isLogoutHidden: true,
            isAdminHidden: true,
            isRegisteredUserHidden: true,
            isAccountSettingsHidden: true,
            isContributionHidden: true,
        }
    }
    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    toggleLogoutHidden () {
        this.setState({
            isLogoutHidden: !this.state.isLogoutHidden
        })
        this.setState({
            isRegisteredUserHidden: true
        })
        this.setState({
            isAccountSettingsHidden: true
        })
        this.setState({
            isContributionHidden: true
        })
        this.setState({
            isAdminHidden: true
        })
    }

    toggleAdminHidden () {
        this.setState(prevState => ({
            isAdminHidden: !prevState.isAdminHidden
          }));
        //this.setState({
           // isAdminHidden: !this.state.isAdminHidden
       // })
        this.setState({
            isLogoutHidden: true
        })
        this.setState({
            isRegisteredUserHidden: true
        })
        this.setState({
            isAccountSettingsHidden: true
        })
        this.setState({
            isContributionHidden: true
        })
    }

    toggleRegisteredUserHidden () {
        this.setState({
            isRegisteredUserHidden: !this.state.isRegisteredUserHidden
        })
        this.setState({
            isAdminHidden: true
        })
        this.setState({
            isAccountSettingsHidden: true
        })
        this.setState({
            isContributionHidden: true
        })
        this.setState({
            isLogoutHidden: true
        })
    }

    toggleContributionHidden () {
        this.setState({
            isContributionHidden: !this.state.isContributionHidden
        })
        this.setState({
            isAdminHidden: true
        })
        this.setState({
            isAccountSettingsHidden: true
        })
        this.setState({
            isRegisteredUserHidden: true
        })
        this.setState({
            isLogoutHidden: true
        })
    }

    toggleAccountSettingsHidden () {
        this.setState({
            isAccountSettingsHidden: !this.state.isAccountSettingsHidden
        })
        this.setState({
            isAdminHidden: true
        })
        this.setState({
            isContributionHidden: true
        })
        this.setState({
            isRegisteredUserHidden: true
        })
        this.setState({
            isLogoutHidden: true
        })
    }

    logoutUser (){
        this.props.logoutUser();
        this.setState({
            isLogoutHidden: true
        })
    }

    hideDropdowns () {
        if(!this.state.isLogoutHidden){
            this.setState({
                isLogoutHidden: true
            })
        }

        if(!this.state.isAdminHidden){
            this.setState({
                isAdminHidden: true
            })
        }

        if(!this.state.isRegisteredUserHidden){
            this.setState({
                isRegisteredUserHidden: true
            })
        }

        if(!this.state.isAccountSettingsHidden){
            this.setState({
                isAccountSettingsHidden: true
            })
        }

        if(!this.state.isContributionHidden){
            this.setState({
                isContributionHidden: true
            })
        }
    };

    toggleLanguage(e){
        this.props.toggleLanguage(e.target.value);
    }

    render() {
        return (
            <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
                <nav className="navbar navbar-expand-md active navbar-header" style={{ backgroundColor: "#00549a" }}>
                    <div className="container">
                        <Link className="navbar-brand" to="/app">
                            <i className="fa fa-home white-text"></i>
                        </Link>
                        <button onClick={this.toggleHidden.bind(this)} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse myCustomisedMenu" id="navbarSupportedContent" style={this.state.isHidden ? {} : { display: 'block' }}>
                            <ul className="navbar-nav mr-auto">
                                <li style={this.props.roleId === 0 ? {} : {display: 'none'}} className="nav-item active">
                                    <Link className="nav-link" to="/app/test">
                                        <FormattedMessage id="test" />
                                    </Link>
                                </li>

                                <li style={(this.props.roleId === 1 || this.props.roleId === 2) ? {} : {display: 'none'}} className="nav-item active dropdown">
                                    <a className="nav-link" href ="#" id="dropdown06" data-toggle="dropdown" onClick={this.toggleRegisteredUserHidden.bind(this)}>
                                        <span>
                                            <FormattedMessage id="test" />
                                        </span>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdown06" style={this.state.isRegisteredUserHidden ? {} : { display: 'block' }}>
                                        <Link className="dropdown-item" to="/app/test">
                                            <FormattedMessage id="test" />
                                        </Link>
                                        <Link className="dropdown-item" to="/app/resultsn">
                                           <FormattedMessage id="testResults" />
                                        </Link>
                                    </div>
                                </li>

                                <li style={(this.props.roleId === 1 || this.props.roleId === 2) ? {} : {display: 'none'}} className="nav-item active dropdown">
                                    <a className="nav-link" href ="#" id="dropdown07" data-toggle="dropdown" onClick={this.toggleAccountSettingsHidden.bind(this)}>
                                        <span>
                                            <FormattedMessage id="settings" />
                                        </span>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdown07" style={this.state.isAccountSettingsHidden ? {} : { display: 'block' }}>
                                        <Link className="dropdown-item" to="/app/accountsettings">
                                            <FormattedMessage id="settings" />
                                        </Link>
                                    </div>
                                </li>

                                <li style={(this.props.roleId === 1 || this.props.roleId === 2) ? {} : {display: 'none'}} className="nav-item active dropdown">
                                    <a className="nav-link" href ="#" id="dropdown08" data-toggle="dropdown" onClick={this.toggleContributionHidden.bind(this)}>
                                        <span>
                                            <FormattedMessage id="contibute" />
                                        </span>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdown08" style={this.state.isContributionHidden ? {} : { display: 'block' }}>
                                        <Link className="dropdown-item" to="/app/addmyquestion">
                                            <FormattedMessage id="makeContribution" />
                                        </Link>
                                        <Link className="dropdown-item" to="/app/myquestionstatus">
                                            <FormattedMessage id="myContrributionStatus" />
                                        </Link>
                                    </div>
                                </li>

                                <li style={this.props.roleId === 2 ? {} : {display: 'none'}} className="nav-item active dropdown">
                                    <a className="nav-link" href ="#" id="dropdown09" data-toggle="dropdown" onClick={this.toggleAdminHidden.bind(this)}>
                                        <span>
                                            <FormattedMessage id="admin" />
                                        </span>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdown09" style={this.state.isAdminHidden ? {} : { display: 'block' }}>
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
                            <select onChange={this.toggleLanguage.bind(this)} value={this.props.language} className="languageSelect form-select">
                                <option id="en">en</option>
                                <option id="ru">ru</option>
                            </select>
                            <ul className="navbar-nav mi-auto" style={this.props.roleId === 0 ? {} : {display: 'none'}}>
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
                                    <a className="nav-link" id="dropdown05" data-toggle="dropdown" onClick={this.toggleLogoutHidden.bind(this)}>
                                        <span>
                                            <FormattedMessage id="hi" />
                                        </span>{this.props.userName}<span className="caret"></span></a>
                                    <div className="dropdown-menu" aria-labelledby="dropdown05" style={this.state.isLogoutHidden ? {} : { display: 'block' }}>
                                        <a className="dropdown-item" href="#" onClick={this.logoutUser.bind(this)}>
                                            <FormattedMessage id="logout" />
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </IntlProvider>
        )
    }
}
export default TopNavigation

