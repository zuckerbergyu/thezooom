import { red } from '@mui/material/colors';

export const styles = {
  root: {
    padding: '13px 20px',
  },
  tabItemRoot: {
    background: 'white',
    padding: '7px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    height: '37px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    color: 'gray',
    borderColor: 'gray',
    borderRadius: '3px',
    margin: '0px  8px 4px 0px',
    '&:last-child': {
      marginRight: '0',
    },
  },
  click: {
    color: '#0061f2',
    borderColor: '#0061f2',
  },
  divider: { width: '100%' },
};
