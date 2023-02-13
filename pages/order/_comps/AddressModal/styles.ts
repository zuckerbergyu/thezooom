import theme from 'constants/theme';
export const styles = {
  root: {},
  addressRoot: {},
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
  addressListRoot: {},
};
