import { Typography, Breadcrumbs, ButtonBase } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { SxProps } from 'libs/sx';
import { styles } from './styles';
import { useRouter } from 'next/router';

type Props = {
  sx?: SxProps;
  items: any[];
};

const Breadcrumb = (props: Props) => {
  const router = useRouter();
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" sx={styles.icon} />}
      aria-label="breadcrumb"
      sx={styles.root}
    >
      {props.items?.map((item, index) => {
        return (
          <ButtonBase
            key={index}
            disableRipple
            onClick={() => {
              router.push(
                item.catgryCd === '/'
                  ? item.catgryCd
                  : `/goods/list/${item.catgryCd}?brandCd=${item.brandCd}`
              );
            }}
          >
            <Typography
              sx={[
                styles.label,
                index === props.items.length - 1 && styles.labelSelected,
              ]}
            >
              {item.catgryNm}
            </Typography>
          </ButtonBase>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
