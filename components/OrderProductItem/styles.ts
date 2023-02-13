import theme, { Colors } from 'constants/theme';
export const styles = {
  root: { borderBottom: `1px solid ${Colors.gray[100]}` },
  cardRoot: { borderRadius: '7px' },
  cardActionAreaRoot: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'start',
    padding: '16px 20px',
  },
  thumbnailAreaRoot: {
    position: 'relative',
    marginRight: '12px',
  },
  thumbnailImg: { borderRadius: '3px' },
  contentsRoot: {
    display: 'flex',
    height: '110px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 0,
    margin: 0,
  },
  titleRoot: {},
  title: {
    textAlign: 'left',
    lineHeight: '1.5',
    fontSize: 14,
    fontWeight: '500',
    whiteSpace: 'pre-wrap',
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: '1',
    WebkitBoxOrient: 'vertical',
  },
  priceRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  priceTxt: { fontSize: '16px', fontWeight: 700 },
  priceSubTxt: { fontSize: '13px' },
  subInfoTxt: {
    color: theme.palette.grey[400],
    fontSize: '12px',
    fontWeight: 500,
  },
};
