import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {
    display: 'flex',
  },
  labelRoot: {
    display: 'flex',
    marginBottom: '8px',
  },
  label: {
    fontSize: '15px',
  },
  labelIcon: {
    color: Colors.primary[600],
  },
  close: { marginRight: '4px' },
  closeIcon: {
    width: '16px',
    height: '16px',
  },
  form: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey[300],
    borderRadius: '3px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: { ml: '6px', mr: '4', flex: 1, height: '46px' },
  multiLineInput: { height: '0' },
  search: {
    width: '36px',
    height: '36px',
    marginLeft: '8px',
  },
};
