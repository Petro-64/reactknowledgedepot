import React from 'react';
import messages from '../../translations/EditContributionForm';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { IntlProvider, FormattedMessage } from "react-intl";



const MuiMyContributionStatus = props => {
  const { contributions, language } = props;

  const translations = {
    status:  language === 'en' ? messages.en.status : messages.ru.status,
    createdAt:  language === 'en' ? messages.en.createdAt : messages.ru.createdAt,
    subject: language === 'en' ? messages.en.subject : messages.ru.subject,
    pending: language === 'en' ? messages.en.pending : messages.ru.pending,
    approved: language === 'en' ? messages.en.approved : messages.ru.approved,
    declined: language === 'en' ? messages.en.declined : messages.ru.declined,
    noAddedQuestions: language === 'en' ? messages.en.noAddedQuestions : messages.ru.noAddedQuestions,
  }

  const renderLink = (params) => {
    let statusWord = (params.row.status === 0 ? translations.pending : params.row.status === 1 ? translations.approved : translations.declined);
    const url =  '/app/mycontribution/' + params.row.id;
    return (
      <Link to={url}>{ statusWord }</Link>
    )
}

  function transform(value) {
    let myres = value.reduce(
    function(newArr, ind){
      ind.createdAt = ind.createdAt.substring(0, 10);
      let statusWord = (ind.status === 0 ? translations.pending : ind.status === 1 ? translations.approved : translations.declined);
      let link = '<a href="/app/mycontribution/' + ind.id + '">' + {statusWord} + '</a>';
      ind = {...ind, statusWord: statusWord, link: link};
      newArr.push(ind);
      return newArr;
    }, [])
    return myres;	
  }

  let contributionTransformed =[];
  if(!!contributions){
    contributionTransformed = transform(contributions);
  }

  const columns = [
    { field: 'subjectName', headerName: translations.subject, headerClassName: 'dataGridHeaderClassName' },
    { field: 'createdAt', headerName: translations.createdAt, headerClassName: 'dataGridHeaderClassName'  },
    { field: 'link', headerName: translations.status, renderCell: renderLink, headerClassName: 'dataGridHeaderClassName' }
  ];

  return (
    <IntlProvider locale={language} messages={messages[language]}>
    <div style={contributionTransformed.length !== 0 ? {display: 'none', height: 800, width: 'auto'} : {height: 800, width: 'auto'}}>
      <FormattedMessage id="noAddedQuestions" />
    </div>
    <div style={contributionTransformed.length === 0 ? {display: 'none', height: 800, width: 'auto'} : {height: 800, width: 'auto'}}>
        <DataGrid
          rows={contributionTransformed}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableSelectionOnClick
          disableExtendRowFullWidth={true}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
          getCellClassName={(params) => {
            let styleName = (params.row.status === 0 ? 'dataGridPending' : params.row.status === 1 ? 'dataGridApproved' : 'dataGridDeclined');
            return styleName;
          }}
        />
    </div>
    </IntlProvider>

  );
};

export default MuiMyContributionStatus;