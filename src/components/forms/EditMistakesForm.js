import React from 'react';
import EditMistakeRow from './EditMistakeRow';
import { IntlProvider } from "react-intl";
import messages from '../../translations/EditSubjectForm';

const EditMistakeForm = props => {
    //console.log(props.language);
  const { language, mistakesCut, deleteMistake } = props;
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <table className="table">
          <thead>
            <tr>
              <th>Subj</th>{/* <FormattedMessage id="name" /> */}
              <th>Id</th>{/* <FormattedMessage id="email" /> */}
              <th>Question</th>{/*? <FormattedMessage id="createdAt" /> */}
              <th>Nr of mistakes</th>{/* <FormattedMessage id="status" /> */}
              <th>Delete</th>{/* <FormattedMessage id="testResults" /> */}
            </tr>
          </thead>
          <tbody>
              {mistakesCut.map(mistake => <EditMistakeRow  
                mistake={mistake}
                deleteMistake={deleteMistake} 
              /> )}
          </tbody>
      </table>
    </IntlProvider>
  );
};

export default EditMistakeForm;