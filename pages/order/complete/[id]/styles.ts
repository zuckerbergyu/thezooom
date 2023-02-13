import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {},
  headerRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  headerTxt: {
    fontSize: '20px',
    fontWeight: 500,
  },
  orderFoldingSectionLabelRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderFoldingSectionLabel: {},
  orderFoldingSectionCount: { fontSize: '14px' },

  goShoppingBtnRoot: {
    padding: '80px 20px 20px',
  },
  goShoppingBtn: {
    width: '100%',
    height: '64px',
    background: Colors.black,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
  },
  goShoppingTxt: { color: Colors.white, fontWeight: 700, fontSize: '19px' },
};
