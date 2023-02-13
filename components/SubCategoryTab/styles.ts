import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {
    padding: '13px 20px',
  },
  tabItemRoot: {
    background: Colors.white,
    padding: '7px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    height: '37px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    color: theme.palette.grey[400],
    borderColor: theme.palette.grey[400],
    borderRadius: '3px',
    margin: '0px  8px 4px 0px',
    '&:last-child': {
      marginRight: '0',
    },
  },
  click: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
  divider: { width: '100%' },
};
