import { ScreenMargin } from 'constants/styles';
import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {},
  drawer: {
    maxWidth: '1000px',
    maxHeight: '500px',
    margin: ScreenMargin,
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
  },
  arrowIcon: { width: 60 },
  treeView: {},
  mainTreeItem: {
    '& .MuiTreeItem-iconContainer': {
      order: 1,
      width: '34px',
      height: '34px',
      color: theme.palette.grey[400],
      overflow: 'visible',
      paddingRight: '16px',
      '& svg': {
        width: '34px',
        height: '34px',
      },
    },
    '& .MuiTreeItem-label': {
      color: Colors.black,
      fontSize: '15px',
      padding: '16px 0px 16px 4px',
      marginRight: '50px',
    },
    '& .MuiTreeItem-group': {
      margin: 'auto',
    },
    '& .MuiTreeItem-content': {},
    '& .MuiTreeItem-expanded': {},
  },
  mainTreeItemLabelRoot: {
    display: 'flex',
  },
  mainTreeItemLabelIcon: {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  },
  subTreeItemRoot: {
    width: '100%',
    background: theme.palette.grey[200],
    display: 'flex',
    justifyContent: 'start',
  },
  subTreeItemLabelRoot: {
    padding: '8px 38px',
    display: 'flex',
  },
  subTreeItemLabel: {
    color: theme.palette.grey[700],
    fontSize: '14px',
  },
};
