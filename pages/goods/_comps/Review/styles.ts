import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {},
  itemRoot: { padding: '20px' },
  ratingRoot: {},
  rating: { color: '#0000ff' },
  contentRoot: { marginBottom: '10px' },
  content: { fontSzie: '14px' },
  dateRoot: {},
  date: {
    color: theme.palette.grey[600],
  },

  pagination: {
    display: 'flex',
    margin: '40px 0px',
    justifyContent: 'center',
  },
  paginationItem: {
    borderRadius: '0px',
    border: `1px solid ${Colors.grey[600]}`,
    background: Colors.white,
    color: Colors.black,
    '&.Mui-selected': {
      backgroundColor: Colors.black,
      color: Colors.white,
    },
    '&.Mui-selected:hover': {
      backgroundColor: Colors.black,
      color: Colors.white,
      border: 0,
    },
  },
  empty: {
    padding: '100px 0px 425px',
  },
};
