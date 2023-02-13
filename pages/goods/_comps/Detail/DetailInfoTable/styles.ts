import theme, { Colors } from 'constants/theme';
export const styles = {
  root: { padding: '15px 0px' },
  cellTitle: {
    padding: 0,
    color: theme.palette.grey[600],
    borderBottom: 'none',
    verticalAlign: 'top',
    width: '65%',
    '&.MuiTableCell-root': {
      paddingBottom: '2px',
    },
  },
  cellInfo: {
    width: '30%',
    padding: 0,
    color: Colors.black,
    borderBottom: 'none',
    verticalAlign: 'top',
    '&.MuiTableCell-root': {
      paddingBottom: '2px',
    },
  },
};
