import React, { useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
} from '@mui/material';
import TextField from 'components/TextField';
import { SELECT_REQUIREMENTS_OPTIONS as options } from 'constants/meta';
import { styles } from './styles';

type Props = {
  addressMemo: string;
  setAddressMemo: (value: string) => void;
};
const AddressMemo = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (selectedIndex === 0 || selectedIndex === 5) {
      props.setAddressMemo('');
    } else {
      props.setAddressMemo(options[selectedIndex]);
    }
  }, [selectedIndex]);

  return (
    <Box sx={styles.root}>
      <List component="nav" aria-label="Address Memo" disablePadding>
        <ListItem
          button
          disablePadding
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Address Memo Item"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
          sx={styles.listItemRoot}
        >
          <ListItemText
            primary="배송 요청사항"
            secondary={options[selectedIndex]}
          />
        </ListItem>
        {options[selectedIndex] === options[options.length - 1] && (
          <Box sx={styles.textFieldRoot}>
            <TextField
              placeholder={'배송 요청사항을 입력해주세요.'}
              value={props.addressMemo}
              onChange={props.setAddressMemo}
            />
          </Box>
        )}
      </List>
      <Menu
        id="Address Memo Menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
export default AddressMemo;
