import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {},
  checkIcon: { color: theme.palette.grey[300] },
  checkedIcon: { color: theme.palette.primary.main },
  labelRoot: { display: 'flex', alignItems: 'center', alignContent: 'center' },
  label: { fontSize: '15px' },
  labelDot: {
    color: theme.palette.primary.main,
    fontSize: '18px',
    paddingTop: '4px',
  },
  contentsRoot: {
    background: Colors.gray[100],
    borderRadius: '4px',
    padding: '24px 15px',
  },
  contentTxt: { fontSize: '13px' },
};
