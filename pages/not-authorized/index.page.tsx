import { useRouter } from 'next/router';
import { Box, ButtonBase, Typography } from '@mui/material';
import Image from 'components/Image';
import { styles } from './styles';

const NotAuthorized = () => {
  return (
    <Box sx={styles.root}>
      <Image
        alt="notAuthorized"
        src={'/images/notAuthorized.png'}
        width={112}
        height={112}
      />
      <Typography sx={styles.mainInfo}>정보가 만료되었습니다.</Typography>
      <Typography sx={styles.subInfo}>
        사이트를 종료하고, 다시 접속해주세요.
      </Typography>
      <ButtonBase
        onClick={() => {
          window.open('about:blank', '_self')?.self.close();
        }}
        sx={styles.btnRoot}
      >
        <Typography sx={styles.btnLabel}>닫기</Typography>
      </ButtonBase>
    </Box>
  );
};

export default NotAuthorized;
