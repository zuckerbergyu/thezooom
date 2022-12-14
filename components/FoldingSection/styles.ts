export const styles = {
  root: {},
  treeView: {
    borderBottom: '12px solid #f0f0f0',
  },
  mainTreeItem: {
    padding: 0,
    '& .MuiTreeItem-iconContainer': {
      order: 1,
      width: '24px',
      height: '24px',
      color: 'gray',
      overflow: 'visible',
      paddingRight: '20px',
      '& svg': {
        width: '24px',
        height: '24px',
      },
    },
    '& .MuiTreeItem-label': {
      color: 'black',
      fontSize: '18px',
      margin: '16px 0px 16px 20px',
      paddingLeft: '0px !important',
      marginRight: '50px',
    },
    '& .MuiTreeItem-group': {
      margin: 'auto',
      borderBottom: '1px solid #d8d8d8',
    },
    '& .MuiTreeItem-content': {
      borderBottom: '1px solid #d8d8d8',
      padding: 0,
    },
    '& .MuiTreeItem-expanded': {},
  },
  arrowIcon: { width: 60 },
};
