import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import QuizIcon from '@mui/icons-material/Quiz';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AddTaskIcon from '@mui/icons-material/AddTask';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../translations/TopNavigation';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ToggleLanguageButton from './formelements/ToggleLanguageButton';
import AvatarMy from './formelements/AvatarMy';
import SearchIcon from '@mui/icons-material/Search';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

function MaterialUiNavigation(props) {
  const [state, setState] = React.useState({top: false, left: false,  bottom: false, right: false, });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [selectedIndex, setSelectedIndex] = React.useState("");
  const handleClick = index => {
    if (selectedIndex === index) {
      setSelectedIndex("")
    } else {
      setSelectedIndex(index)
    }
  }

  const list = (anchor) => (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
      > 
      <Box sx={{ justifyContent: 'flex-end' }}>         
        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar"  aria-haspopup="true"  onClick={toggleDrawer('left', false)} color="inherit">
          <CloseIcon />
        </IconButton>
        </Box>
        <List>
          <Link to="/app" color="#444" variant="p" underline="none" className="drawerNavigationLink">
            <ListItemButton onClick={toggleDrawer('left', false)}>
                <ListItemText>
                <FormattedMessage id="home" />
                </ListItemText>
            </ListItemButton>
          </Link>

          <ListItemButton onClick={() => { handleClick(2) }}>
              <ListItemText><FormattedMessage id="test" /></ListItemText>
              {2 === selectedIndex ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={2 === selectedIndex} timeout="auto" unmountOnExit>
              <Link to="/app/test" color="#444" variant="p" underline="none" className="drawerNavigationLink">
                <ListItemButton onClick={toggleDrawer('left', false)}>
                  <ListItemIcon>
                    <QuizIcon />
                  </ListItemIcon>
                    <ListItemText sx={{ mx: -2 }}>
                      <FormattedMessage id="test" />
                    </ListItemText>
                </ListItemButton>
              </Link>
              {(props.roleId === 1 || props.roleId === 2) && (
              <>
                <Link to="/app/resultsn" color="#444" variant="p" underline="none" className="drawerNavigationLink">
                  <ListItemButton onClick={toggleDrawer('left', false)}>
                    <ListItemIcon>
                      <SummarizeIcon />
                    </ListItemIcon>
                    <ListItemText sx={{ mx: -2 }}>
                    <FormattedMessage id="testResults" />
                    </ListItemText>
                  </ListItemButton>
                </Link>
                <Link to="/app/mistakes" color="#444" variant="p" underline="none" className="drawerNavigationLink">
                  <ListItemButton onClick={toggleDrawer('left', false)}>
                    <ListItemIcon>
                      <ReportGmailerrorredIcon />
                    </ListItemIcon>
                    <ListItemText sx={{ mx: -2 }}>
                    <FormattedMessage id="mistakes" />
                    </ListItemText>
                  </ListItemButton>
                </Link>
              </>
              )}
          </Collapse>

          {(props.roleId === 1 || props.roleId === 2) && (
          <>
          <ListItemButton onClick={() => { handleClick(1) }}>
              <ListItemText><FormattedMessage id="contibute" /></ListItemText>
              {1 === selectedIndex ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={1 === selectedIndex} timeout="auto" unmountOnExit>
            <Link to="/app/addmyquestion" color="#444" variant="p" underline="none" className="drawerNavigationLink">
              <ListItemButton onClick={toggleDrawer('left', false)}>
                <ListItemIcon>
                  <AddTaskIcon />
                </ListItemIcon>
                <ListItemText sx={{ mx: -2 }}>
                <FormattedMessage id="contibute" /> 
                </ListItemText>
              </ListItemButton>
            </Link>
            <Link to="/app/myquestionstatus" color="#444" variant="p" underline="none" className="drawerNavigationLink">
              <ListItemButton onClick={toggleDrawer('left', false)}>
                <ListItemIcon>
                  <FactCheckIcon />
                </ListItemIcon>
                <ListItemText sx={{ mx: -2 }}>
                <FormattedMessage id="myContrributionStatus" />
                </ListItemText>
              </ListItemButton>
            </Link>
          </Collapse>
          </>
          )}
          {( props.roleId === 2) && (
            <>
            <Divider />
            <ListItemButton onClick={() => { handleClick(3) }}>
                <ListItemText><FormattedMessage id="admin" /></ListItemText>
                {3 === selectedIndex ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={3 === selectedIndex} timeout="auto" unmountOnExit>
              <Link to="/app/users" color="#444" variant="p" underline="none" className="drawerNavigationLink">
                <ListItemButton onClick={toggleDrawer('left', false)}>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ mx: -2 }}>
                  <FormattedMessage id="users" />   
                  </ListItemText>
                </ListItemButton>
              </Link>
              <Link to="/app/subjects" color="#444" variant="p" underline="none" className="drawerNavigationLink">
                <ListItemButton onClick={toggleDrawer('left', false)}>
                  <ListItemIcon>
                    <FactCheckIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ mx: -2 }}>
                  <FormattedMessage id="subjects" />
                  </ListItemText>
                </ListItemButton>
              </Link>
              <Link to="/app/adminsettings" color="#444" variant="p" underline="none" className="drawerNavigationLink">
                <ListItemButton onClick={toggleDrawer('left', false)}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ mx: -2 }}>
                  <FormattedMessage id="globalSettings" />
                  </ListItemText>
                </ListItemButton>
              </Link>

              <Link to="/app/admincontribution" color="#444" variant="p" underline="none" className="drawerNavigationLink">
                <ListItemButton onClick={toggleDrawer('left', false)}>
                  <ListItemIcon>
                    <AddTaskIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ mx: -2 }}>
                  <FormattedMessage id="contribution" />
                  </ListItemText>
                </ListItemButton>
              </Link>

              <Link to="/app/adminaddquestion" color="#444" variant="p" underline="none" className="drawerNavigationLink">
                <ListItemButton onClick={toggleDrawer('left', false)}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ mx: -2 }}>
                  <FormattedMessage id="addQuestion" />
                  </ListItemText>
                </ListItemButton>
              </Link>

              <Link to="/app/admineditquestion" color="#444" variant="p" underline="none" className="drawerNavigationLink">
                <ListItemButton onClick={toggleDrawer('left', false)}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ mx: -2 }}>
                  <FormattedMessage id="editQuestion" />
                  </ListItemText>
                </ListItemButton>
              </Link>
              <Link to="/app/adminsearchquestion" color="#444" variant="p" underline="none" className="drawerNavigationLink">
                <ListItemButton onClick={toggleDrawer('left', false)}>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ mx: -2 }}>
                  <FormattedMessage id="searchForQusestion" />
                  </ListItemText>
                </ListItemButton>
              </Link>
            </Collapse>
            </>
          )}
        </List>
      </Box>
    </IntlProvider>
  );

  return (
    <div>
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <AppBar position="static">
          <Toolbar disableGutters sx={{ mx: 0 }}>
            <div style={{ width: '100%' }}>
              <Box display="flex" flexDirection="row" p={0} m={0}>
                <Box p={1} >
                <IconButton size="medium" aria-label="account of current user" aria-controls="menu-appbar"  aria-haspopup="true" sx={{ mr: 1 }} onClick={toggleDrawer('left', true)} color="inherit">
                  <MenuIcon />
                </IconButton>
                </Box>
                <Box sx={{ pl: 0, pt: 1.75, ml: -1 }} >
                  <Link to="/app/" color="#fff" variant="h6" underline="none" className="custom-mui-home-link" sx={{ ml: 0 }}>Knowledgedepot</Link>
                </Box>
                <div style={{ width: '100%' }}>
                  <Box display="flex" flexDirection="row-reverse" p={0} m={0}>
                    <Box p={1}>
                      <Tooltip title="Open account settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <AvatarMy userName={props.userName}/>
                        </IconButton>
                      </Tooltip>
                      <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top',  horizontal: 'right',}} keepMounted transformOrigin={{vertical: 'top',horizontal: 'right',}}  open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                         {(( props.roleId === 1) || ( props.roleId === 2) || ( props.roleId === 3))  && (
                          <MenuItem key={"logout"} onClick={props.logoutUser}>
                            <Typography textAlign="center" onClick={handleCloseUserMenu}>
                              <FormattedMessage id="logout" />
                            </Typography>
                          </MenuItem>
                          )}
                          {( props.roleId === 0) && (
                          <>
                            <Link to="/app/login" color="#444" variant="p" underline="none" className="drawerNavigationLink">
                              <MenuItem key={"login"}>
                                  <Typography textAlign="center">
                                    <FormattedMessage id="login" />
                                  </Typography>
                              </MenuItem>
                            </Link>
                            <Link to="/app/signup" color="#444" variant="p" underline="none" className="drawerNavigationLink">
                              <MenuItem key={"register"}>
                                  <Typography textAlign="center">
                                    <FormattedMessage id="register" />
                                  </Typography>
                              </MenuItem>
                            </Link>
                          </>
                          )}
                          {(( props.roleId === 1) || ( props.roleId === 2) || ( props.roleId === 3))  && (
                          <Link to="/app/accountsettings" color="#444" variant="p" underline="none" className="drawerNavigationLink">
                            <MenuItem key={"Change password"} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">
                                  <FormattedMessage id="changePassword" />
                                </Typography>
                            </MenuItem>
                          </Link>
                          )}
                      </Menu>
                    </Box>
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
    <Drawer anchor={'left'}  open={state['left']} onClose={toggleDrawer('left', false)} sx={{ mb: 0.25 }}>
        {list('left')}
        <List style={{ marginTop: `auto` }}>
          <Link to="/app" color="#444" variant="p" underline="none" className="drawerNavigationLink" onClick={toggleDrawer('left', false)}>
              <p className="drawerFooterLink">©2020 Copyright: Petro Niemkov</p>
          </Link>
        </List>
    </Drawer>

    </div>
  );
}

export default MaterialUiNavigation;