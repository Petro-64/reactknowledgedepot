import React from 'react';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/EditSubjRow';
import Modal from '../Modal';
import Prompt from '../Prompt';



export default class EditUserRow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.user.user_id,
            status: this.props.user.status,
        }
        this.modall = React.createRef();
        this.promptt = React.createRef();
    }
   
    openModal(){
        this.modall.current.showModal();
    }

    openPromptt(){
       if(this.props.user.status == 'user-confirmed'){
            this.promptt.current.showModal();
       } else {
            this.props.toggleusersuspend({id: this.state.id, reason: 'none'});
       };
    }

    toggleSubjectActivity(){
        this.props.toggleSubjectActivity({id: this.state.id});
    }

    deleteUser(){
        this.props.deleteUser({id: this.state.id});
    }

    toggleuserconfirm(){
        this.props.toggleuserconfirm({id: this.state.id});
    }

    toggleusersuspend(){
        this.props.toggleusersuspend({id: this.state.id, reason: this.promptt.current.state.value});
    }

    render(props) {
        const { name, email, status, resultsNumber, createdAt, id, suspension_reason } = this.props.user;
        const { language } = this.props;
      return  (
        <>
            <Modal ref={this.modall} toExecute = {this.deleteUser.bind(this)} message={'Please confirm user deletion'} titlle={'Please confirm'}/>
            <Prompt ref={this.promptt} toExecute = {this.toggleusersuspend.bind(this)} message={''} titlle={'Suspension reason'}/>
            <IntlProvider locale={language} messages={messages[language]}>
                <tr>
                    <td > { name } </td>
                    <td > { email } </td>
                    <td >
                        { createdAt }
                    </td>
                    <td  style={status === 'user-confirmed' ? {backgroundColor: '#bce8bc'} : status === 'user-suspended' ? {backgroundColor: '#efc9c9'} : {backgroundColor: '#f3edaa'}}>
                        { status }
                    </td>
                    <td>
                        { resultsNumber }
                    </td>
                    <td>
                        <button className="btn btn-danger btn-sm" onClick={this.openModal.bind(this)}  disabled={resultsNumber > 0 || status === 'user-confirmed' || status === 'user-suspended'}>Delete</button>
                    </td>
                    <td>
                        <button className="btn btn-success btn-sm" onClick={this.toggleuserconfirm.bind(this)} disabled={status === 'user-confirmed' || status === 'user-suspended'}>Confirm</button>
                    </td>
                    <td>
                        <button className="btn btn-warning btn-sm"  onClick={this.openPromptt.bind(this)} disabled={status === 'user-unconfirmed'}>
                            {status === 'user-suspended' ? 'Activate' : 'Suspend'}
                        </button>
                    </td>
                    <td>
                        <div>{suspension_reason}</div>
                    </td>
                </tr>
            </IntlProvider>
        </>
    );
    }
  }