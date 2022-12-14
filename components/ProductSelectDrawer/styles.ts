import { ScreenMargin } from 'constants/styles';
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
    background: 'wthie',
  },
  headerRoot: {
    background: 'white',
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
      color: 'gray',
      overflow: 'visible',
      paddingRight: '16px',
      '& svg': {
        width: '24px',
        height: '24px',
      },
    },
    '& .MuiTreeItem-label': {
      color: 'black',
      fontSize: '15px',
      padding: '16px 0px 16px 4px',
      marginRight: '50px',
    },
    '& .MuiTreeItem-group': {
      margin: 'auto',
      borderBottom: '1px solid #d8d8d8',
      maxHeight: '160px',
      overflowY: 'scroll',
    },
    '& .MuiTreeItem-content': {
      borderBottom: '1px solid #d8d8d8',
    },
    '& .MuiTreeItem-expanded': {},
  },
  subTreeItemRoot: {
    width: '100%',
    background: '#f0f0f0',
    display: 'flex',
    justifyContent: 'start',
  },
  subTreeItemLabel: {
    color: 'black',
    fontSize: '14px',
    fontWeight: 400,
    padding: '8px 30px ',
    display: 'flex',
    alignItems: 'center',
  },
  subTreeItemNoStock: {
    textDecoration: 'line-through',
    color: 'gray',
  },

  addSellTxt: {
    marginLeft: '8px',
    fontSize: '12px',
    color: '#1b81a8',
  },

  paymentCalculationRoot: {
    padding: '16px',
  },
  paymentCalculation: {
    boxShadow: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#5fc2d5',
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
    color: 'gray',
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
    color: 'black',
    fontSize: '17px',
    fontWeight: 600,
  },
  addRemoveIcon: { color: 'black' },
  price: { fontSize: '18px', fontWeight: 500 },
  finalPriceRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 18px',
    borderTop: '1px solid #d8d8d8',
  },
  finalPriceLabel: { fontSize: '18px' },
  finalPrice: { fontSize: '20px', color: '#5fc2d5', fontWeight: 600 },
};
