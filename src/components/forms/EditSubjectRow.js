import React from 'react';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/EditSubjRow';
import Modal from '../Modal';


export default class EditSubjectRow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isInputHidden: true,
            name: this.props.subject.name,
            id: this.props.subject.id,
            editMode: false
        }
        this.modall = React.createRef();
    }
   

    saveSubject() {
        this.props.saveSubject({id: this.state.id, name: this.state.name});
        this.setState({editMode: false})
    }

    deleteSubject(){
        this.props.deleteSubject({id: this.state.id});
    }

    openModal(){
        this.modall.current.showModal();
    }

    toggleSubjectActivity(){
        this.props.toggleSubjectActivity({id: this.state.id});
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    toggleEditModeTrue () {
        this.setState({
            editMode: true
        })
    }

    render(props) {
        const { name, active, questions_number } = this.props.subject;//saveSubject
        const activePhrase = active === 1 ? this.props.language === 'en' ? messages.en.active1 : messages.ru.active1 : this.props.language === 'en' ? messages.en.hidden : messages.ru.hidden;
        const { language } = this.props;
      return  (
        <>
            <Modal ref={this.modall} toExecute = {this.deleteSubject.bind(this)} message={'Please confirm subject deletion'}/>
            <IntlProvider locale={language} messages={messages[language]}>
                <tr>
                    <td style={this.state.editMode ? {display: 'none'} : { display: 'block' }}> {name} </td>
                    <td style={this.state.editMode ? {display: 'block'} : { display: 'none' }}><input type="text"  value={this.state.name} onChange={this.handleChangeName.bind(this)}/></td>
                    <td onClick={this.toggleSubjectActivity.bind(this)} className="cursorPointer">
                    {activePhrase}
                    </td>
                    <td>
                    {questions_number}
                    </td>
                    <td style={this.state.editMode ? {display: 'block'} : { display: 'none' }}>
                        <button className="btn btn-success btn-sm" onClick={this.saveSubject.bind(this)}><FormattedMessage id="save" /></button>
                    </td>
                    <td style={this.state.editMode ? {display: 'none'} : { display: 'block' }}>
                        <button className="btn btn-warning btn-sm" onClick={this.toggleEditModeTrue.bind(this)}><FormattedMessage id="edit" /></button>
                    </td>
                    <td>
                        <button className="btn btn-danger btn-sm" onClick={this.openModal.bind(this)} disabled={questions_number > 0}><FormattedMessage id="delete" /></button>
                    </td>
                </tr>
            </IntlProvider>
        </>
    );
    }
  }

