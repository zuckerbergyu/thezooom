import theme from 'constants/theme';
export const styles = {
  root: { padding: '20px', display: 'flex' },
  paymentBtnRoot: {
    width: '33%',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    borderWidth: '2px',
    borderStyle: 'solid',
  },
  paymentBtnSelectedRoot: {
    borderColor: theme.palette.primary.main,
  },
  creditIcon: { color: theme.palette.grey[300], width: '40px', height: '40px' },
  creditIconSelected: { color: theme.palette.primary.main },
  label: { color: theme.palette.grey[300], fontSize: '14px', fontWeight: 500 },
  labelSelected: { color: theme.palette.primary.main },
};
