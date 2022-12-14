import { Tab } from '@mui/material';
import { styles } from './styles';

type Props = {
  value?: string;
  path: string;
  name: string;
  onClick?: (code?: string) => void;
};
const TabItem = (props: Props) => {
  const { value, path, name, onClick, ...rest } = props;

  return (
    <Tab
      value={value}
      component="a"
      disableRipple
      sx={styles.root}
      onClick={() => onClick?.(path)}
      label={name}
      {...rest}
    />
  );
};
export default TabItem;
