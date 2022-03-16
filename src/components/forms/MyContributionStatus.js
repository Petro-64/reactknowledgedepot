import React from 'react';
import EditMyContributionRow from './EditMyContributionRow';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/EditContributionForm';

const MyContributionStatus = props => {
  const { contributions, language } = props;
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <table className="table">
          <thead>
            <tr>
              <th><FormattedMessage id="subject" /></th>
              <th><FormattedMessage id="createdAt" /></th>
              <th><FormattedMessage id="status" /></th>
            </tr>
          </thead>
          <tbody>
            {Array.from(contributions).map(contribution => <EditMyContributionRow contribution={contribution}  language={language} key={contribution.resultId}/> )}
          </tbody>
      </table>
    </IntlProvider>
  );
};

export default MyContributionStatus;