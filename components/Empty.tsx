import Stack from '@mui/material/Stack';
import Text from '@mui/material/Typography';
import { Colors } from 'constants/theme';
import { SxProps, toArray } from 'libs/sx';

type Props = {
  sx?: SxProps;
  text?: string | null;
  children?: React.ReactNode | null;
};
const Empty = ({ text, children, sx }: Props) => (
  <Stack sx={[styles.stack, ...toArray(sx)]}>
    <Text sx={styles.text}>{text}</Text>
    {children}
  </Stack>
);

const styles = {
  stack: {
    display: 'flex',
    paddingTop: '150px',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.grey['500'],
  },
};

export default Empty;
