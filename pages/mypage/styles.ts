import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {},
  mainTabRoot: {},
  mainTabs: {
    margin: '4px 20px',
    height: '38px',
    minHeight: '38px',
    '.MuiTabs-indicator': {
      display: 'none',
    },
  },
  mainTab: {
    height: '38px',
    minHeight: '38px',
    fontSize: '15px',
    fontWeight: 500,
    color: Colors.black,
    '&.Mui-selected': {
      borderRadius: '4px',
      color: Colors.white,
      background: Colors.black,
    },
  },
  mainTabPanelRoot: {},
  subTabRoot: {},
  subTabs: {
    '.MuiTabs-indicator': {
      background: Colors.black,
      height: 3,
    },
  },
  subTab: {
    background: Colors.gray[100],
    fontSize: '14px',
    fontWeight: 500,
    color: theme.palette.grey[600],
    borderBottom: `3px solid ${theme.palette.grey[300]}`,
    '&.Mui-selected': {
      color: Colors.black,
    },
  },
  subTabPanelRoot: {
    minHeight: 'calc(100vh - 142px)',
  },
  submitAddressRoot: {
    padding: '16px 20px',
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  submitAddressBtnRoot: {
    padding: '10px 0px',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '4px',
    borderWidth: '1px',
    borderColor: theme.palette.grey[500],
    borderStyle: 'solid',
  },
  submitAddressTxt: { fontSize: '14px' },
};
