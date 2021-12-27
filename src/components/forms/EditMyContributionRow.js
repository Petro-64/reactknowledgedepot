import React from 'react';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/EditSubjRow';
import { Link } from 'react-router-dom';

export default class EditMyContributionRow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.contribution.resultId,
            status: this.props.contribution.status,
        }
    }

    render(props) {
        const { userName, subjectName, createdAt, status } = this.props.contribution;
        const { language } = this.props;
        let statusWord = status == 0 ? messages[language].pending : status == '1' ? messages[language].approved : messages[language].declined;
        let url = '/app/mycontribution/' + this.state.id;
      return  (
        <>
            <IntlProvider locale={language} messages={messages[language]}>
                <tr>
                    <td > { subjectName } </td>
                    <td > { createdAt } </td>
                    <td style={status == '0' ? {backgroundColor: '#efe756'} : status == '1' ? {backgroundColor: '#9dd49b', color: 'white !important'} : {backgroundColor: '#efc9c9', color: 'white !important'}} > 
                       <Link to={url}>{ statusWord }</Link>
                    </td>
                </tr>
            </IntlProvider>
        </>
    );
    }
}