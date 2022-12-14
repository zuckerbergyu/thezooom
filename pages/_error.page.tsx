import { useRouter } from 'next/router';
import { Box, ButtonBase, Typography } from '@mui/material';
import Image from 'components/Image';

const Error = () => {
  const router = useRouter();
  return (
    <Box sx={styles.root}>
      <Image
        alt="notAuthorized"
        src={'/images/notAuthorized.png'}
        width={112}
        height={112}
      />
      <Typography sx={styles.mainInfo}>
        죄송합니다.페이지를 찾을수 없습니다.
      </Typography>
      <Typography sx={styles.subInfo}>
        페이지가 존재하지 않거나, 사용할수 없는 페이지입니다.
      </Typography>
      <Typography sx={styles.subInfo}>
        입력하신 주소가 정확한지 다시한번 확인해 주시기 바랍니다.
      </Typography>
      <ButtonBase
        onClick={() => {
          router.replace('/');
        }}
        sx={styles.btnRoot}
      >
        <Typography sx={styles.btnLabel}>메인으로</Typography>
      </ButtonBase>
    </Box>
  );
};

export const styles = {
  root: {
    marginTop: '160px',
    minHeight: 'calc(100vh-48px);',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainInfo: {
    fontSize: '22px',
    fontWeight: 700,
    marginTop: '20px',
  },
  subInfo: { fontSize: '14px', fontWeight: 500, color: 'gray' },
  btnRoot: {
    marginTop: '8px',
    background: '#f99828',
    padding: '10px 24px',
    borderRadius: '22px',
  },
  btnLabel: { color: 'white', fontWeight: 600, fontSize: '15px' },
};
export default Error;
