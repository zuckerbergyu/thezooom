import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {},
  headerRoot: { padding: '16px 20px' },
  headerTxt: { fontSize: '18px', fontWeight: 500 },
  bodyAreaRoot: { padding: '16px 20px', background: Colors.gray[100] },
  bodyRoot: { background: Colors.white, borderRadius: '6px' },
  bodyPriceRoot: { padding: '20px 20px' },
  bodyPriceInfoRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
  },
  bodyPriceInfoRootMargin: { marginBottom: '0px' },
  bodyPriceInfoTitle: { fontSize: '15px' },
  bodyPriceInfoContent: { fontSize: '15px', fontWeight: 600 },
  bodyFinalPriceRoot: {
    background: theme.palette.primary.main,
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px',
    padding: '17px 20px',
  },
  bodyFinalPriceInfoRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    color: Colors.white,
  },
  bodyFinalPriceInfoTitle: { fontSize: '15px', fontWeight: 700 },
  bodyFinalPriceInfoContent: { fontSize: '19px', fontWeight: 600 },
};
