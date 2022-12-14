import { Box, Typography } from '@mui/material';
import { styles } from './styles';
import Image from 'components/Image';
import { SxProps } from 'libs/sx';
import DetailInfoTable from './DetailInfoTable';
import Divider from 'components/Divider';
import getImageFromHtml from 'libs/getImageFromHtml';

type Props = {
  sx?: SxProps;
  panelData: any[];
};
const Detail = ({ sx, panelData }: Props) => {
  const detailInfo = panelData[1];
  const detailImageList = getImageFromHtml(panelData[0].goodsDetailInfo) || [];
  console.log(detailInfo);
  return (
    <Box sx={styles.root}>
      <Box sx={styles.imageRoot}>
        {detailImageList &&
          detailImageList.length > 0 &&
          detailImageList.map((src) => (
            <Image key={src} layout="fill" src={src} alt="productDetailImage" />
          ))}
      </Box>
      {detailInfo.length > 0 && (
        <Box sx={styles.deliveryInfoRoot}>
          <Typography sx={styles.deliveryInfoTitle}>상품정보</Typography>
          <Divider size={1} />
          <DetailInfoTable goodsInfo={detailInfo} />
        </Box>
      )}
    </Box>
  );
};

export default Detail;
