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
    color: 'black',
    '&.Mui-selected': {
      borderRadius: '4px',
      color: 'white',
      background: 'black',
    },
  },
  mainTabPanelRoot: {},
  subTabRoot: {},
  subTabs: {
    '.MuiTabs-indicator': {
      background: 'black',
      height: 3,
    },
  },
  subTab: {
    background: '#f0f0f0',
    fontSize: '14px',
    fontWeight: 500,
    color: '#444',
    borderBottom: '3px solid #e1e1e1',
    '&.Mui-selected': {
      color: 'black',
    },
  },
  subTabPanelRoot: {
    // background: '#f0f0f0',
    minHeight: 'calc(100vh - 142px)',
  },
  submitAddressRoot: {
    padding: '16px 20px',
    background: 'ellow',
    borderTop: '1px solid #e8e8e8',
    borderBottom: '1px solid #e8e8e8',
  },
  submitAddressBtnRoot: {
    padding: '10px 0px',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '4px',
    borderWidth: '1px',
    borderColor: '#8a8a8a',
    borderStyle: 'solid',
  },
  submitAddressTxt: { fontSize: '14px' },
};
