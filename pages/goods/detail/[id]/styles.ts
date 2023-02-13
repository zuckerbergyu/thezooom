import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {},
  divider: {
    width: '100%',
  },

  headerRoot: {},
  thumbnailRoot: {
    display: 'flex',
    justifyContent: 'center',
  },

  contentsRoot: {
    padding: '20px 20px 0',
  },
  titleRoot: {
    marginBottom: '4px',
  },
  title: {
    textAlign: 'left',
    lineHeight: '1.5',
    fontSize: '20px',
    fontWeight: '600',
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
    marginBottom: '10px',
  },
  salePercentage: {
    color: Colors.red,
    fontWeight: 600,
    fontSize: '18px',
    marginRight: '4px',
  },
  salePrice: {
    fontWeight: 700,
    fontSize: '20px',
  },
  price: {
    color: theme.palette.grey[600],
    textDecoration: 'line-through',
    marginLeft: '9px',
    fontSize: '15px',
  },
  freeDeliveryRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.grey[100],
    borderRadius: '2px',
    width: 'fit-content',
    marginBottom: '34px',
  },
  freeDeliveryTxt: {
    fontWeight: 500,
    fontSize: '16px',
    padding: '4px 10px',
  },
  pannelRoot: { marginBottom: '50px' },

  buyButton: {
    zIndex: '1201 !important',
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    maxWidth: '1000px',
    fontWeight: 700,
    fontSize: '19px',
    width: '100vw',
    height: '64px',
    color: Colors.white,
    background: Colors.black,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
  },
};
