import React from 'react';
import EditUserRow from './EditUsertRow';
import { IntlProvider } from "react-intl";
import messages from '../../translations/EditSubjectForm';

const EditSubjectForm = props => {
  const { users, toggleSubjectActivity, language, deleteUser, toggleuserconfirm, toggleusersuspend } = props;
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <table className="table">
          <thead>
            <tr>
              <th>Name</th>{/* <FormattedMessage id="name" /> */}
              <th>Email</th>{/* <FormattedMessage id="email" /> */}
              <th>Created At</th>{/*? <FormattedMessage id="createdAt" /> */}
              <th>Status</th>{/* <FormattedMessage id="status" /> */}
              <th>Tests</th>{/* <FormattedMessage id="testResults" /> */}
              <th>Delete User</th>{/* <FormattedMessage id="testResults" /> */}
              <th>Confirm User</th>{/* <FormattedMessage id="testResults" /> */}
              <th>Suspend User</th>{/* <FormattedMessage id="testResults" /> */}
              <th>Reason</th>{/* <FormattedMessage id="testResults" /> */}
            </tr>
          </thead>
          <tbody>
              {users.map(user => <EditUserRow 
                user={user} 
                toggleSubjectActivity = {toggleSubjectActivity}
                key={user.user_id}
                language={language}
                deleteUser={deleteUser}
                toggleuserconfirm={toggleuserconfirm}
                toggleusersuspend={toggleusersuspend}
              /> )}
          </tbody>
      </table>
    </IntlProvider>
  );
};

export default EditSubjectForm;