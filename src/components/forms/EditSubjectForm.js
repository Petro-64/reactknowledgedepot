import React from 'react';
import EditSubjectRow from './EditSubjectRow';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/EditSubjectForm';

const EditSubjectForm = props => {
  const { saveSubject, subjects, deleteSubject, toggleSubjectActivity, language } = props;
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <table>
          <thead>
            <tr>
              <th><FormattedMessage id="subject" /></th>
              <th><FormattedMessage id="active" />?</th>
              <th><FormattedMessage id="questionNumber" /></th>
              <th><FormattedMessage id="edit" /></th>
              <th><FormattedMessage id="delete" /></th>
            </tr>
          </thead>
          <tbody>
              {subjects.map(subject => <EditSubjectRow 
              subject={subject} 
              saveSubject={saveSubject} 
              deleteSubject={deleteSubject} 
              toggleSubjectActivity = {toggleSubjectActivity}
              key={subject.id}
              language={language}
              /> )}
          </tbody>
      </table>
    </IntlProvider>
  );
};

export default EditSubjectForm;