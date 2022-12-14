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
import { styles } from './styles';

type Props = {
  addressMemo: string;
  setAddressMemo: (value: string) => void;
  type: '교환' | '반품' | '취소';
  options: string[];
};

const SelectReasonMemo = (props: Props) => {
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
    if (selectedIndex === 0 || selectedIndex === props.options.length - 1) {
      props.setAddressMemo('');
    } else {
      props.setAddressMemo(props.options[selectedIndex]);
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
            primary={`${props.type} 유형`}
            secondary={props.options[selectedIndex]}
          />
        </ListItem>
        {props.options[selectedIndex] ===
          props.options[props.options.length - 1] && (
          <Box sx={styles.textFieldRoot}>
            <TextField
              placeholder={`${props.type} 사유를 입력해주세요.`}
              value={props.addressMemo}
              onChange={props.setAddressMemo}
              multiLine
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
        PaperProps={{
          sx: styles.paperProps,
        }}
      >
        {props.options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
            sx={{ width: '100%' }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
export default SelectReasonMemo;
