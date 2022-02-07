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
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
//import Link from '@mui/material/Link';
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

 function MaterialUiNavigation(props) {
  const [state, setState] = React.useState({top: false, left: false,  bottom: false, right: false, });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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

  const handleClickSubmenu2 = () => {
    //openContributionSubmenu(!setOpenContributionSubmenu);
  };

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
                <ListItemButton>
                  <ListItemIcon>
                    <QuizIcon />
                  </ListItemIcon>
                    <ListItemText sx={{ mx: -2 }}>
                      <FormattedMessage id="test" />
                    </ListItemText>
                </ListItemButton>
              </Link>
              {(props.roleId === 1 || props.roleId === 2) && (
              <Link to="/app/resultsn" color="#444" variant="p" underline="none" className="drawerNavigationLink">
                <ListItemButton>
                  <ListItemIcon>
                    <SummarizeIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ mx: -2 }}>
                  <FormattedMessage id="testResults" />
                  </ListItemText>
                </ListItemButton>
              </Link>
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
              <ListItemButton>
                <ListItemIcon>
                  <AddTaskIcon />
                </ListItemIcon>
                <ListItemText sx={{ mx: -2 }}>
                <FormattedMessage id="contibute" /> 
                </ListItemText>
              </ListItemButton>
            </Link>
            <Link to="/app/myquestionstatus" color="#444" variant="p" underline="none" className="drawerNavigationLink">
              <ListItemButton>
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
          <ListItemButton onClick={() => { handleClick(3) }}>
              <ListItemText><FormattedMessage id="admin" /></ListItemText>
              {3 === selectedIndex ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={3 === selectedIndex} timeout="auto" unmountOnExit>
            <Link to="/app/users" color="#444" variant="p" underline="none" className="drawerNavigationLink">
              <ListItemButton>
                <ListItemIcon>
                  <AddTaskIcon />
                </ListItemIcon>
                <ListItemText sx={{ mx: -2 }}>
                <FormattedMessage id="users" /> 
                </ListItemText>
              </ListItemButton>
            </Link>
            <Link to="/app/subjects" color="#444" variant="p" underline="none" className="drawerNavigationLink">
              <ListItemButton>
                <ListItemIcon>
                  <FactCheckIcon />
                </ListItemIcon>
                <ListItemText sx={{ mx: -2 }}>
                <FormattedMessage id="subjects" />
                </ListItemText>
              </ListItemButton>
            </Link>
          </Collapse>
        </List>
        {/*<Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>*/}
      </Box>
    </IntlProvider>
  );

  return (
    <div>
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <AppBar position="static">
          <Toolbar disableGutters sx={{ mx: 1 }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar"  aria-haspopup="true" sx={{ mr: 2 }} onClick={toggleDrawer('left', true)} color="inherit">
                <MenuIcon />
              </IconButton>
              <Link to="/app/" color="#fff" variant="h6" underline="none" className="custom-mui-home-link" sx={{ ml: 2 }}>Knowledgedepot</Link>
            <Box sx={{ flexGrow: 1}}></Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top',  horizontal: 'right',}} keepMounted transformOrigin={{vertical: 'top',horizontal: 'right',}}  open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
      </AppBar>
    </IntlProvider>
    <Drawer anchor={'left'}  open={state['left']} onClose={toggleDrawer('left', false)}>
        {list('left')}
    </Drawer>

    </div>
  );
}

export default MaterialUiNavigation;