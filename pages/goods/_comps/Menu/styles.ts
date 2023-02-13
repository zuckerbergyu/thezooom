import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {
    borderBottom: '.5px solid gray',
  },
  tabs: {
    '.MuiTabs-indicator': {
      background: 'black',
      height: 3,
    },
  },
  tab: {
    fontSize: '17px',
    fontWeight: 500,
    color: theme.palette.grey[600],
    '&.Mui-selected': {
      color: Colors.black,
    },
  },
};
