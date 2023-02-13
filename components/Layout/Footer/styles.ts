import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {},
  divider: {
    width: '100%',
  },
  footerCorp: {
    height: '36px',
    display: 'flex',
    alignItems: 'center',
  },
  footerCorpTxt: {
    fontSize: '12px',
    padding: '16px 20px',
  },
  footerInfo: {
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[100],
    padding: '16px 20px',
  },
  footerInfoPrivacyTxt: {
    fontSize: '12px',
    '&:after': {
      margin: '0px 6px',
      content: '"l"',
      fontWeight: 700,
    },
  },
  footerInfoRulesTxt: {
    fontSize: '12px',
    '&:after': {
      margin: '0px 6px',
      content: '"l"',
      fontWeight: 700,
    },
  },
  footerInfoCompanyTxt: {
    fontSize: '12px',
  },
  footerCs: {
    color: Colors.white,
    height: '103px',
    display: 'flex',
    padding: '20px',
    flexDirection: 'row',
    backgroundColor: Colors.black,
  },
  footerCsTitle: {
    width: '75px',
  },
  footerCsTxt: {
    color: Colors.white,
    fontSize: '12px',
  },
  footerCsPhoneTxt: {
    color: Colors.white,
    fontSize: '12px',
    paddingBottom: '8px',
  },
  linkStyle: {
    textDecoration: 'none',
  },
};
