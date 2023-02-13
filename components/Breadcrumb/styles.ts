import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignText: 'center',
    height: '42px',
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  label: {
    color: theme.palette.grey[400],
    fontSize: '16px',
  },
  labelSelected: {
    color: Colors.black,
    fontWeight: 600,
  },
  icon: { marginBottom: '4px' },
};
