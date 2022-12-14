import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { styles } from './styles';
import { useRouter } from 'next/router';

const BtnBack = () => {
  const router = useRouter();
  return (
    <IconButton
      sx={[styles.root, styles.show]}
      onClick={() => {
        router.back();
      }}
    >
      <ArrowBackIcon sx={styles.icon} />
    </IconButton>
  );
};

export default BtnBack;
