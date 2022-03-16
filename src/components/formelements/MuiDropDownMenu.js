import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import messages from '../../translations/Contribution';

function MuiDropDownMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

{/**/}

  const translations = {
    select:  props.language === 'en' ? messages.en.select : messages.ru.select,
    clickToSelect:  props.language === 'en' ? messages.en.clickToSelect : messages.ru.clickToSelect,
  }

  const select = props.language === 'en' ? messages.en.select : messages.ru.select;
  const clickToSelect = props.language === 'en' ? messages.en.clickToSelect : messages.ru.clickToSelect;

  const myOptions = props.options;
  let name = !!myOptions[selectedIndex] ? myOptions[selectedIndex].name : translations.select;

  const handleMenuItemClick = (event, index, id, name) => {
    props.onMuiDropdownChange(id, name); 
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary={translations.clickToSelect}
            secondary={name}
          />
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