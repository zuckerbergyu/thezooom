import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {},

  titleTxt: { fontSize: '20px', fontWeight: 700 },
  firstSubTitleRoot: { marginTop: '25px' },
  firstSubTitleTxt: { fontSize: '14px', fontWeight: 700 },
  firstContentRoot: { marginTop: '15px', display: 'flex' },
  firstContentTxt: { fontSize: '12px' },

  secondSubTitleRoot: { marginTop: '20px' },
  secontSubTitleTxt: { fontSize: '14px', fontWeight: 700 },
  secondContentRoot: { marginTop: '15px', display: 'flex' },
  secondContentTxt: { fontSize: '12px' },

  innerRoot: { padding: '10px 0px 10px 10px' },
  innerTxtRoot: { display: 'flex', marginBottom: '4px' },
  innerTxt: { fontSize: '12px', color: theme.palette.grey[600] },

  dotTxt: { fontSize: '12px', marginRight: '4px' },
  innerDotTxt: {
    fontSize: '12px',
    marginRight: '4px',
    color: Colors.gray[300],
  },
};
