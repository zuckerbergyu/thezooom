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
    color: 'red',
    fontWeight: 600,
    fontSize: '18px',
    marginRight: '4px',
  },
  salePrice: {
    fontWeight: 700,
    fontSize: '20px',
  },
  price: {
    color: 'gray',
    textDecoration: 'line-through',
    marginLeft: '9px',
    fontSize: '15px',
  },
  freeDeliveryRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f6f9',
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
    // 전체너비로 할경우 주석해제하고 maxwidth 삭제
    maxWidth: '1000px',
    // left: 0,
    // right: 0,
    fontWeight: 700,
    fontSize: '19px',
    width: '100vw',
    height: '64px',
    color: 'white',
    background: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
  },
};
