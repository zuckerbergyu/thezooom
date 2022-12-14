import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SxProps } from 'libs/sx';
import { styles } from './styles';

const options = ['신상품', '낮은가격', '높은가격'];

type Props = {
  sx?: SxProps;
  value: number;
  setValue: (value: number) => void;
  totalCount: number;
};
const ProductGridHeader = ({ totalCount, value, setValue, sx }: Props) => {
  // const [selectedIndex, setSelectedIndex] = useState(value);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  // 메뉴 클릭
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // 메뉴 닫기
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 메뉴 아이템 클릭
  const handleMenuItemClick = (
    _: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setValue(index);
    setAnchorEl(null);
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.filterRoot}>
        <Box sx={styles.totalCountRoot}>
          <Typography sx={styles.totalCount}>{totalCount}개 상품</Typography>
        </Box>
        <List disablePadding component="nav" aria-label="Device settings">
          <ListItem
            button
            disableGutters
            disablePadding
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText
              primaryTypographyProps={styles.listItemText}
              primary={options[value]}
            />
            <ExpandMoreIcon sx={styles.icon} />
          </ListItem>
        </List>
      </Box>

      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={styles.menuListProps}
      >
        {options.map((option, index) => (
          <MenuItem
            sx={styles.menuItem}
            key={option}
            selected={index === value}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
export default ProductGridHeader;
