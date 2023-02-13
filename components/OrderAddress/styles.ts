import theme from 'constants/theme';
export const styles = {
  root: {},
  divider: {
    width: '100%',
    borderColor: theme.palette.grey[300],
  },
  bodyRoot: {
    padding: '16px 20px',
  },
  sectionRoot: {
    display: 'flex',
    alignItems: 'start',
    marginBottom: '10px',
  },
  bodyTitleRoot: { width: '100px' },
  bodyTitle: { fontSize: '15px', fontWeight: 600 },
  bodyContentRoot: { width: '100%' },
  bodyContent: { fontSize: '15px', color: theme.palette.grey[600] },
};
