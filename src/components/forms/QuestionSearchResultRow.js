import React from 'react';
import Highlighter from "react-highlight-words";
import StyledQuestionSearch from '../../styled/StyledQuestionSearch';
import { Link } from 'react-router-dom';

export default class QuestionSearchResultRow extends React.Component {
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

    onRollover(id){
        this.props.onTdRollover(id);
    }

    render() {
      const { id, name, subject_id, user_id } = this.props.question;
      const keyWord = this.props.keyWord; 
      const answersToShow = this.props.answersToShow;
      let url = '/app/admineditquestions/' + id;
      return  (
        
                <tr>
                    <td > { id } </td>
                     
                    <StyledQuestionSearch className="questionCell" onMouseOver={()=>{this.props.loadAnswers(id)}}>
                        <div className="cellContent" >
                            <div className="hiddenTip">
                                {answersToShow.map(answer => <div className={answer.correct === 1 ? 'correctAnswer' : 'uncorrectAnswer'} key={answer.id}>{answer.name}</div> )}
                            </div>

                            <Highlighter
                                highlightClassName="search_highlight"
                                searchWords={[keyWord]}
                                autoEscape={true}
                                textToHighlight={ name }
                            />
                        </div>
                    </StyledQuestionSearch>
                    <td > { subject_id } </td>
                    <td > { user_id }  </td>
                    <td ><Link to={{pathname: url, state: { prevPath: window.location.pathname }}}>edit</Link></td>
                </tr>
        
    );
    }
  }