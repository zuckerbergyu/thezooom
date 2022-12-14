import { Box, Typography } from '@mui/material';
import { styles } from './styles';

const ExchangeReturnInfo = () => {
  return (
    <Box sx={styles.root}>
      <Typography sx={styles.titleTxt}>교환/반품 안내</Typography>
      <Box sx={styles.firstSubTitleRoot}>
        <Typography sx={styles.firstSubTitleTxt}>교환/반품 기간</Typography>
      </Box>
      <Box sx={styles.firstContentRoot}>
        <Typography sx={styles.dotTxt}>-</Typography>
        <Typography sx={styles.firstContentTxt}>
          상품 수령한 날로부터 7일 이내 교환/반품 신청 가능합니다.
        </Typography>
      </Box>
      <Box sx={styles.secondSubTitleRoot}>
        <Typography sx={styles.secontSubTitleTxt}>
          교환/반품이 불가능한 경우(수령 후 7일 이내)
        </Typography>
      </Box>

      <Box sx={styles.secondContentRoot}>
        <Typography sx={styles.dotTxt}>-</Typography>
        <Typography sx={styles.secondContentTxt}>
          전자상거래 등에서 소비자보호에 관한 법률에 따라 다음의 경우 청약철회가
          제한 될 수 있습니다.
        </Typography>
      </Box>
      <Box sx={styles.innerRoot}>
        <Box sx={styles.innerTxtRoot}>
          <Typography sx={styles.innerDotTxt}>-</Typography>
          <Typography sx={styles.innerTxt}>
            제품 박스 개봉/상품 비닐 포장 개봉/상품의 택 제거 및
            상품훼손/상품사용
          </Typography>
        </Box>
        <Box sx={styles.innerTxtRoot}>
          <Typography sx={styles.innerDotTxt}>-</Typography>
          <Typography sx={styles.innerTxt}>
            송장택이 붙어 있는 택배박스없이 반송시 교환/반품/환불 불가(아웃박스
            포장 후 접수 부탁드립니다)
          </Typography>
        </Box>
        <Box sx={styles.innerTxtRoot}>
          <Typography sx={styles.innerDotTxt}>-</Typography>
          <Typography sx={styles.innerTxt}>
            시간 경과에 다라 상품 등의 가치가 현저히 감ㅅ하여 재판매가 불가능한
            경우
          </Typography>
        </Box>
        <Box sx={styles.innerTxtRoot}>
          <Typography sx={styles.innerDotTxt}>-</Typography>
          <Typography sx={styles.innerTxt}>
            사용 또는 일부 소비에 의해 상품의 가치가 훼손된 경우
          </Typography>
        </Box>
        <Box sx={styles.innerTxtRoot}>
          <Typography sx={styles.innerDotTxt}>-</Typography>
          <Typography sx={styles.innerTxt}>
            구매한 상품의 구성이 누락된 경우(세트 상품 일부 누락, 사은품, 가전
            제품 부속품 등)
          </Typography>
        </Box>
        <Box sx={styles.innerTxtRoot}>
          <Typography sx={styles.innerDotTxt}>-</Typography>
          <Typography sx={styles.innerTxt}>
            시간 경과에 다라 상품 등의 가치가 현저히 감ㅅ하여 재판매가 불가능한
            경우
          </Typography>
        </Box>
        <Box sx={styles.innerTxtRoot}>
          <Typography sx={styles.innerDotTxt}>-</Typography>
          <Typography sx={styles.innerTxt}>
            그 외 기타, 상품의 교환, 환불 및 상품의 결함 등의 보상은
            소비자분쟁해결기준(공정거래위원회 고시)에 의함
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default ExchangeReturnInfo;
