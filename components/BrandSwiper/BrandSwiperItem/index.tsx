import { Box, ButtonBase } from '@mui/material';
import { SxProps } from 'libs/sx';
import Image from 'components/Image';
import { styles } from './styles';

type Props = {
  sx?: SxProps;
  data: any[];
  onClick?: (path: string, brandPath: string) => void;
};
const BrandSwiperItem = (props: Props) => (
  <Box sx={styles.root}>
    {props.data.map((item, index) => (
      <ButtonBase
        key={index}
        sx={styles.btnRoot}
        onClick={() =>
          props.onClick &&
          props.onClick(item.catgryPathCd, String(item.brandCd))
        }
      >
        <Image
          alt={item.name}
          css={styles.img}
          src={item.brandImg}
          layout="fill"
        />
      </ButtonBase>
    ))}
  </Box>
);

export default BrandSwiperItem;
