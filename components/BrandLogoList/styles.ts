export const styles = {
  root: {
    display: 'flex',
    padding: '20px',
    overflow: 'scroll',
    background: 'lightGray',
  },
  itemRoot: {
    borderRadius: '12px',
    overflow: 'hidden',
  },
  item: {
    marginRight: '4px',
    '&:last-child': {
      marginRight: 0,
    },
  },
};
