import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { IntlProvider } from "react-intl";
import messages from '../translations/TopNavigation';
import ToggleLanguageButton from './formelements/ToggleLanguageButton';


function MaterialUiNavigationMini(props) {
  return (
    <div>
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <AppBar position="static">
          <Toolbar disableGutters sx={{ mx: 0 }}>
            <div style={{ width: '100%' }}>
              <Box display="flex" flexDirection="row" p={0} m={0}>
                <Box sx={{ pl: 4, pt: 1.75, ml: -1 }} >
                  <Link to="/app/" color="#fff" variant="h6" underline="none" className="custom-mui-home-link" sx={{ ml: 0 }}>Knowledgedepot</Link>
                </Box>
                <div style={{ width: '100%' }}>
                  <Box display="flex" flexDirection="row-reverse" p={0} m={0}>
                    <Tooltip title="Change language">
                      <Box sx={{ p: 2, mt: 0.25 }}>
                        <ToggleLanguageButton language={props.language} toggleLanguage={props.toggleLanguage}/>
                      </Box>
                    </Tooltip>
                  </Box>
                </div>
              </Box>
            </div>
          </Toolbar>
      </AppBar>
    </IntlProvider>
    </div>
  );
}

export default MaterialUiNavigationMini;