import React from 'react';
import { IntlProvider } from "react-intl";
import messages from '../../translations/EditSubjRow';
import StyledEditQuestionrRow from '../../styled/StyledEditQuestionrRow';
import { Link } from 'react-router-dom';




export default class EditQuestionrRow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.questions.id,
        }
        this.modall = React.createRef();
        this.promptt = React.createRef();
    }
   
    openModal(){
        this.modall.current.showModal();
    }

    openPromptt(){

    }

    toggleQuestActivity(){
        this.props.toggleQuestionActivity(this.state.id);
    }

    onRollover(){
        this.props.onTdRollover(this.state.id);
    }

    render() {
        let { id, name, active, created_at } = this.props.questions;
        let { editedQuestionsArray } = this.props;
        let edited = editedQuestionsArray.includes(this.state.id);
        created_at = created_at.substring(0, 10);
        let statusWord = active === 1 ? 'active' : 'unactive';
        let url = '/app/admineditquestions/' + this.state.id;
        const { language, answersToShow } = this.props;
        return  (
            <>
                <StyledEditQuestionrRow style={edited ? {backgroundColor: '#ecffea'} : active === 1 ? {backgroundColor: '#fff'} : {backgroundColor: '#f1f1f1'}}>
                    {/* style={active === 1 ? {backgroundColor: '#fff'} : {backgroundColor: '#f1f1f1'}} */}
                    <IntlProvider locale={language} messages={messages[language]}>
                            <td width="10%">{id}</td>
                            <td width="55%" className="questionCell" onMouseOver={this.onRollover.bind(this)}>
                                {name}
                                <div className="popupAnswersHint">
                                    {answersToShow.map(answer => <div className={answer.correct === 1 ? 'correctAnswer' : 'uncorrectAnswer'} key={answer.id}>{answer.name}</div> )}
                                </div>
                            </td>
                            <td width="15%">{created_at}</td>
                            <td className="pointer" width="10%" onClick={this.toggleQuestActivity.bind(this)}>{statusWord}</td>
                            <td width="10%"><Link to={url}>edit</Link></td>
                    </IntlProvider>
                </StyledEditQuestionrRow>
            </>
        );
    }
  }