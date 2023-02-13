import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {},
  treeView: {
    borderBottom: `12px solid ${Colors.gray[100]}`,
  },
  mainTreeItem: {
    padding: 0,
    '& .MuiTreeItem-iconContainer': {
      order: 1,
      width: '24px',
      height: '24px',
      color: theme.palette.grey[400],
      overflow: 'visible',
      paddingRight: '20px',
      '& svg': {
        width: '24px',
        height: '24px',
      },
    },
    '& .MuiTreeItem-label': {
      color: Colors.black,
      fontSize: '18px',
      margin: '16px 0px 16px 20px',
      paddingLeft: '0px !important',
      marginRight: '50px',
    },
    '& .MuiTreeItem-group': {
      margin: 'auto',
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    '& .MuiTreeItem-content': {
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      padding: 0,
    },
    '& .MuiTreeItem-expanded': {},
  },
  arrowIcon: { width: 60 },
};
