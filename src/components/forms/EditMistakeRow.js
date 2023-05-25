import React from 'react';
import { IntlProvider } from "react-intl";
import messages from '../../translations/EditSubjRow';
import Modal from '../formelements/Modal';
import Prompt from '../formelements/Prompt';



export default class EditUserRow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.mistake.questionId,
        }
    }

    deleteMistake(){
        this.props.deleteMistake({id: this.state.id});
    }

    render(props) {
        const { name, questionId, question, countt } = this.props.mistake;
        // const { language } = this.props;
      return  (
        <>
                <tr>
                    <td key="1"> { name }</td>
                    <td  key="2"> { questionId } </td>
                    <td  key="3"> { question }  </td>
                    <td key="4"> { countt } </td>
                    <td key="5">
                        <button className="btn btn-danger btn-sm" onClick={this.deleteMistake.bind(this)}>Delete</button>
                    </td>
                </tr>
        </>
    );
    }
  }