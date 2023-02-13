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
    bottom: '50px',
    paddingBottom: '28px',
    background: Colors.white,
  },
  headerRoot: {
    background: Colors.white,
    padding: '15px 18px',
  },
  titleTxt: {
    fontSize: '15px',
    fontWeight: 500,
  },
  bodyRoot: {
    overflow: 'scroll',
  },
  arrowIcon: { width: 60 },
  treeView: {},
  mainTreeItem: {
    '& .MuiTreeItem-iconContainer': {
      order: 1,
      width: '24px',
      height: '24px',
      color: theme.palette.grey[400],
      overflow: 'visible',
      paddingRight: '16px',
      '& svg': {
        width: '24px',
        height: '24px',
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
      borderBottom: `1px solid ${Colors.gray[200]}`,
      maxHeight: '160px',
      overflowY: 'scroll',
    },
    '& .MuiTreeItem-content': {
      borderBottom: `1px solid ${Colors.gray[200]}`,
    },
    '& .MuiTreeItem-expanded': {},
  },
  subTreeItemRoot: {
    width: '100%',
    background: Colors.gray[100],
    display: 'flex',
    justifyContent: 'start',
  },
  subTreeItemLabel: {
    color: Colors.black,
    fontSize: '14px',
    fontWeight: 400,
    padding: '8px 30px ',
    display: 'flex',
    alignItems: 'center',
  },
  subTreeItemNoStock: {
    textDecoration: 'line-through',
    color: theme.palette.grey[400],
  },

  addSellTxt: {
    marginLeft: '8px',
    fontSize: '12px',
    color: Colors.primary[600],
  },

  paymentCalculationRoot: {
    padding: '16px',
  },
  paymentCalculation: {
    boxShadow: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    borderRadius: '5px',
    padding: '14px',
    marginBottom: '10px',
  },
  paymentCalculationHeaderRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
  },
  goodsOptionTxt: { fontWeight: 600, fontSize: '14px' },
  iconRoot: {
    padding: 0,
  },
  cancelIcon: {
    color: theme.palette.grey[400],
  },
  paymentCalculationBodyRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentCalculationBody: {
    display: 'flex',
    alignItems: 'center',
  },

  quantityTxt: {
    margin: '0px 12px',
    color: Colors.black,
    fontSize: '17px',
    fontWeight: 600,
  },
  addRemoveIcon: { color: Colors.black },
  price: { fontSize: '18px', fontWeight: 500 },
  finalPriceRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 18px',
    borderTop: `1px solid ${Colors.gray[200]}`,
  },
  finalPriceLabel: { fontSize: '18px' },
  finalPrice: {
    fontSize: '20px',
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
};
