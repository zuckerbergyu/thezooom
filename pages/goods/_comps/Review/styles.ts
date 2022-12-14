export const styles = {
  root: {},
  itemRoot: { padding: '20px' },
  ratingRoot: {},
  rating: { color: 'blue' },
  contentRoot: { marginBottom: '10px' },
  content: { fontSzie: '14px' },
  dateRoot: {},
  date: { color: 'gray' },

  pagination: {
    display: 'flex',
    margin: '40px 0px',
    justifyContent: 'center',
  },
  paginationItem: {
    borderRadius: '0px',
    border: `1px solid gray`,
    background: 'white',
    color: 'black',
    '&.Mui-selected': {
      backgroundColor: 'black',
      color: 'white',
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'black',
      color: 'white',
      border: 0,
    },
  },
  empty: {
    padding: '100px 0px 425px',
  },
};
