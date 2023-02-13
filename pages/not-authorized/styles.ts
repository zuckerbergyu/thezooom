import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainInfo: {
    fontSize: '24px',
    fontWeight: 700,
    marginTop: '20px',
  },
  subInfo: {
    fontSize: '14px',
    fontWeight: 500,
    color: theme.palette.grey[400],
  },
  btnRoot: {
    marginTop: '8px',
    background: '#f99828',
    padding: '10px 24px',
    borderRadius: '22px',
  },
  btnLabel: { color: Colors.white, fontWeight: 600, fontSize: '15px' },
};
