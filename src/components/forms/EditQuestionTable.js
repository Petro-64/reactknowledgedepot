import React from 'react';
import EditQuestionrRow from './EditQuestionrRow';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/EditSubjectForm';



export default class EditQuestionTable extends React.Component {
    constructor(props){
        super(props);
    }
   
    render() {
        const { questions, language, toggleQuestionActivity, onTdRollover, answersToShow, editedQuestionsArray } = this.props;
        return  (
            <IntlProvider locale={language} messages={messages[language]}>
            <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>{/* <FormattedMessage id="name" /> */}
                    <th>Question</th>{/* <FormattedMessage id="email" /> */}
                    <th>Created At</th>{/*? <FormattedMessage id="createdAt" /> */}
                    <th>Status</th>{/* <FormattedMessage id="status" /> */}
                    <th>Edit</th>{/* <FormattedMessage id="status" /> */}
                  </tr>
                </thead>
                <tbody>
                    {questions.map(questions => <EditQuestionrRow 
                      questions={questions} 
                      key={questions.id}
                      language={language}
                      toggleQuestionActivity={toggleQuestionActivity}
                      onTdRollover={onTdRollover}
                      answersToShow={answersToShow}
                      editedQuestionsArray={editedQuestionsArray}
                    /> )}
                </tbody>
            </table>
          </IntlProvider>
        );
    }
  }

