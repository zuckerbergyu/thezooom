import { Tab } from '@mui/material';
import { styles } from './styles';

type Props = {
  value?: string;
  path: string;
  name: string;
};
const TabItem = (props: Props) => {
  const { value, path, name, ...rest } = props;

  return (
    <Tab
      value={value}
      component="a"
      disableRipple
      sx={styles.root}
      href={path !== '/' ? `/goods/list/${path}` : path}
      label={name}
      {...rest}
    />
  );
};
export default TabItem;
