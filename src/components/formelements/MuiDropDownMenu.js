import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

function MuiDropDownMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const translations = {
    select:  props.language === 'en' ? props.messages.en.select : props.messages.ru.select,
    clickToSelect:  props.language === 'en' ? props.messages.en.clickToSelect : props.messages.ru.clickToSelect,
  }

  const myOptions = props.options;
  
  let toShow
  if((typeof myOptions[selectedIndex] === 'undefined') || ( myOptions[selectedIndex] === null)) {
    toShow = '';
  } else {
    toShow =  myOptions[selectedIndex].name;
  }

  let name = props.selectedSubj == "" ? translations.clickToSelect : toShow;

  const handleMenuItemClick = (event, index, id, name) => {
    props.onMuiDropdownChange(id, name, event); 
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const visibility = !!props.visibility && props.visibility === 'none' ? 'none' : 'block';

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{display: visibility}}>
      <List        component="nav"        aria-label="Device settings"        sx={{ bgcolor: 'background.paper' }}      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText secondary={name}/>
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {props.options.map((option, index) => (
          <MenuItem
            key={option.id}
            indd = {index}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index, option.id, option.name)}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default MuiDropDownMenu;