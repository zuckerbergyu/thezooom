import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {
    minHeight: 'calc(100vh - 48px)',
  },
  headerRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  headerTxt: {
    fontSize: '20px',
    fontWeight: 500,
  },
  selectReasonMemoRoot: { padding: '20px' },

  submitBtn: {
    bottom: 0,
    fontWeight: 700,
    fontSize: '16px',
    width: '100%',
    height: '44px',
    color: Colors.white,
    background: Colors.black,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    margin: '30px 0px',
  },
};
