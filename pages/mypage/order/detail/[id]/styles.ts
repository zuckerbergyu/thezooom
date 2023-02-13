import theme from 'constants/theme';
export const styles = {
  root: {},
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
  orderFoldingSectionLabelRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderFoldingSectionLabel: {},
  orderFoldingSectionCount: { fontSize: '14px' },
};
