import React from 'react';
import EditContributionRow from './EditContributionRow';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/EditContributionForm';

const EditContributionForm = props => {
  const { contributions, language, users } = props;
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <table className="table">
          <thead>
            <tr>
              <th><FormattedMessage id="userName" /></th>
              <th><FormattedMessage id="subject" /></th>
              <th><FormattedMessage id="createdAt" /></th>
              <th><FormattedMessage id="status" /></th>
            </tr>
          </thead>
          <tbody>
            {Array.from(contributions).map(contribution => <EditContributionRow contribution={contribution}  language={language} key={contribution.resultId}/> )}
          </tbody>
      </table>
    </IntlProvider>
  );
};

export default EditContributionForm;