import { Tab } from '@mui/material';
import { styles } from './styles';

type Props = {
  value?: string;
  path: string;
  brandPath: string;
  name: string;
  onClick?: (code?: string, brandCode?: string) => void;
};
const TabItem = (props: Props) => {
  const { value, path, brandPath, name, onClick, ...rest } = props;

  return (
    <Tab
      value={value}
      component="a"
      disableRipple
      sx={styles.root}
      onClick={() => onClick?.(path, brandPath)}
      label={name}
      {...rest}
    />
  );
};
export default TabItem;
