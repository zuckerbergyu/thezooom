import theme, { Colors } from 'constants/theme';
export const styles = {
  root: { marginBottom: '48px' },
  rowRoot: { marginBottom: '18px' },
  cardActionAreaRoot: {
    display: 'inline-block',
    '& .MuiCardActionArea-focusHighlight': {
      background: 'transparent',
    },
  },
  cardActionAreaRowRoot: {
    display: 'flex',
    alignItems: 'start',
  },
  thumbnailAreaRoot: {
    position: 'relative',
  },
  thumbnailAreaRowRoot: {
    marginRight: '12px',
  },
  thumbnailImg: { borderRadius: '17px' },
  noStockRoot: {
    background: '#000000A6',
    top: 0,
    position: 'absolute',
    width: '100%',
    height: 'calc(100% - 5px)',
    display: 'flex',
    borderRadius: '17px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noStockRowRoot: {
    width: '98px',
    height: '98px',
  },
  noStockTxt: { color: Colors.white, fontSize: '32px' },

  contentsRoot: {
    padding: 0,
    margin: 0,
  },
  freeDeliveryRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.grey[100],
    borderRadius: '2px',
    width: 'fit-content',
    marginBottom: '4px',
  },
  freeDeliveryTxt: { fontSize: '12px', padding: '1px 4px' },
  titleRoot: {},
  title: {
    textAlign: 'left',
    lineHeight: '1.5',
    fontSize: 14,
    fontWeight: '500',
    whiteSpace: 'pre-wrap',
    // 텍스트 라인 제한 속성
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
  },
  priceRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8px',
  },
  priceRowRoot: {
    marginTop: '0px',
  },
  salePriceRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  salePercentage: {
    color: Colors.red,
    fontWeight: 600,
    fontSize: '14px',
    marginRight: '4px',
  },
  salePrice: {
    fontWeight: 700,
    fontSzie: '14px',
  },
  price: {
    color: theme.palette.grey[400],
    textDecoration: 'line-through',
    fontSize: '13px',
  },
};
