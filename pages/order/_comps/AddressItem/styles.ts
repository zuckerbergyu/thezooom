import theme, { Colors } from 'constants/theme';
export const styles = {
  root: { padding: '16px 20px' },
  headerRoot: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  addressNickNameRoot: {},
  addressNickNameTxt: {
    fontSize: '14px',
    color: theme.palette.primary.main,
  },
  editDeleteRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editDeleteBtn: {
    display: 'flex',
    fontSize: '13px',
  },
  verticalDivider: {
    content: '"',
    display: 'block',
    width: '1px',
    height: '10px',
    background: theme.palette.grey[300],
    margin: '0px 6px',
  },
  bodyAreaRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  bodyRoot: {
    marginTop: '5px',
    width: '80%',
  },
  nameNumberRoot: {
    display: 'flex',
    marginBottom: '8px',
  },
  nameNumberTxt: {
    fontSize: '15px',
    fontWeight: 600,
  },
  addressRoot: {},
  addressTxt: { fontSize: '13px' },

  addressSelectBtnRoot: {
    padding: '3px 18px',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '4px',
    borderWidth: '1px',
    borderColor: theme.palette.grey[500],
    borderStyle: 'solid',
  },
  addressSelectedBtnRoot: {
    borderColor: theme.palette.primary.main,
  },
  addressSelectTxt: {
    fontSize: '13px',
  },
  addressSelectedTxt: {
    color: theme.palette.primary.main,
  },
};
