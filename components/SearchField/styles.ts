import { Colors } from 'constants/theme';

export const styles = {
  root: {
    display: 'flex',
  },
  close: { marginRight: '4px' },
  closeIcon: {
    width: '16px',
    height: '16px',
  },
  form: {
    background: Colors.grey['50'],
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.grey['200'],
    borderRadius: '16px',
    height: '46px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: { ml: '6px', mr: '4', flex: 1 },
  search: {
    width: '36px',
    height: '36px',
    marginLeft: '8px',
  },
  filterBox: {
    paddingLeft: '12px',
  },
  filterIcon: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.grey['200'],
    background: Colors.primary['100'],
    ':hover, :active': {
      background: Colors.primary['100'],
    },
    width: '46px',
    height: '46px',
    borderRadius: '16px',
    display: 'flex',
  },
};
