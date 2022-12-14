import * as React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import Divider from 'components/Divider';
import { styles } from './styles';
import Link from 'next/link';

const Footer = () => {
  return (
    <Box sx={styles.root}>
      <Divider sx={styles.divider} size={1} />
      <Box sx={styles.footerCorp}>
        <Typography sx={styles.footerCorpTxt}>주관사 (주)더줌코리아</Typography>
      </Box>
      <Box sx={styles.footerInfo}>
        <Link href={'/privacy'}>
          <Typography sx={styles.footerInfoPrivacyTxt}>
            개인정보처리방침
          </Typography>
        </Link>
        <Link href={'/rules'}>
          <Typography sx={styles.footerInfoRulesTxt}>이용약관</Typography>
        </Link>
        <Typography
          sx={styles.footerInfoCompanyTxt}
          onClick={() => {
            window.open('https://xarvis.kr', '_blank');
          }}
        >
          운영사 (주)더줌코리아
        </Typography>
      </Box>
      <Box sx={styles.footerCs}>
        <Box sx={styles.footerCsTitle}>
          <Typography sx={styles.footerCsTxt} component="div">
            고객센터
          </Typography>
        </Box>
        <Box>
          <a href="tel:025250920" style={styles.linkStyle}>
            <Typography sx={styles.footerCsPhoneTxt} component="div">
              02-525-0920
            </Typography>
          </a>
          <Typography sx={styles.footerCsTxt} component="div">
            평일 10:00~17:00(점심 12:00~13:00)
          </Typography>
          <Typography sx={styles.footerCsTxt} component="div">
            주말/공휴일 휴무
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
