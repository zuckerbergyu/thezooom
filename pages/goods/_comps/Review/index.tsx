import React, { useState } from 'react';
import {
  Box,
  Rating,
  Typography,
  Pagination,
  PaginationItem,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { styles } from './styles';
import { SxProps } from 'libs/sx';
import Divider from 'components/Divider';
import sliceArray from 'libs/sliceArray';
import Empty from 'components/Empty';
import { NO_REVIEW_LIST } from 'constants/meta';

interface Review {
  rating?: number;
  content?: string;
  date?: string;
}
type Props = {
  sx?: SxProps;
  panelData: any[];
};
const Review = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = props.panelData?.length;
  const splitCount = 5;
  const paginationList =
    (props.panelData &&
      (sliceArray(props.panelData, splitCount) as Review[][])) ||
    [];
  return (
    <Box>
      {paginationList && paginationList.length > 0 ? (
        <Box>
          {paginationList &&
            paginationList.length > 0 &&
            paginationList[currentPage - 1].map((item, index) => (
              <Box sx={styles.root} key={index}>
                <Box sx={styles.itemRoot}>
                  <Box sx={styles.ratingRoot}>
                    <Rating
                      size="small"
                      precision={0.1}
                      name="read-only"
                      sx={styles.rating}
                      value={item.rating}
                      readOnly
                    />
                  </Box>
                  <Box sx={styles.contentRoot}>
                    <Typography sx={styles.content}>{item.content}</Typography>
                  </Box>
                  <Box sx={styles.dateRoot}>
                    <Typography sx={styles.date}>{item.date}</Typography>
                  </Box>
                </Box>
                <Divider size={1} />
              </Box>
            ))}
          {paginationList.length > 1 && (
            <Pagination
              sx={styles.pagination}
              count={Math.floor((totalCount + (splitCount - 1)) / splitCount)}
              onChange={(event: React.ChangeEvent<unknown>, page: number) => {
                setCurrentPage(page);
              }}
              page={currentPage}
              siblingCount={2}
              boundaryCount={2}
              showFirstButton={false}
              hideNextButton={currentPage === paginationList.length}
              hidePrevButton={currentPage === 1}
              renderItem={(item) => (
                <PaginationItem
                  sx={styles.paginationItem}
                  components={{
                    previous: NavigateBeforeIcon,
                    next: NavigateNextIcon,
                  }}
                  {...item}
                />
              )}
            />
          )}
        </Box>
      ) : (
        <Empty text={NO_REVIEW_LIST} sx={styles.empty} />
      )}
    </Box>
  );
};

export default Review;
