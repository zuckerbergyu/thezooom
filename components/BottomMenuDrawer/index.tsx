import { KeyboardEvent, MouseEvent, SetStateAction, useState } from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeView, TreeItem } from '@mui/lab';
import { Category } from 'types/index';
import { styles } from './styles';
import Image from 'components/Image';

type Props = {
  open: boolean;
  onClose: (e: KeyboardEvent | MouseEvent) => void;
  onOpen: (e: KeyboardEvent | MouseEvent) => void;
  items: Category[] | null;
  onSubmit: (path: string, brandPath: string) => void;
};

const BottomMenuDrawer = (props: Props) => {
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [expanded, setExpanded] = useState(['카테고리 전체']);
  const handleToggle = (event: any, nodeIds: SetStateAction<string[]>) => {
    setExpanded(nodeIds);
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={props.open}
      onClose={props.onClose}
      onOpen={props.onOpen}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      PaperProps={{
        sx: styles.drawer,
      }}
    >
      {props.items && (
        <TreeView
          defaultExpandIcon={
            <Box sx={styles.arrowIcon}>
              <ExpandMoreIcon />
            </Box>
          }
          defaultCollapseIcon={
            <Box sx={styles.arrowIcon}>
              <ExpandLessIcon />
            </Box>
          }
          expanded={expanded} // 펼칠 아이디 값을 참조하는 props
          onNodeToggle={handleToggle}
          sx={styles.treeView}
        >
          {/* 대분류 카테고리 */}
          {props.items.map(
            ({ catgryNm, catgryCd, brandCd, iconImg, child }, index) => (
              <TreeItem
                key={index}
                nodeId={catgryNm}
                sx={styles.mainTreeItem}
                label={
                  <Box
                    onClick={(e) => {
                      e.stopPropagation();
                      props.onSubmit(catgryCd, brandCd);
                    }}
                    sx={styles.mainTreeItemLabelRoot}
                  >
                    {iconImg && (
                      <Image
                        alt="drawerMainIcon"
                        css={styles.mainTreeItemLabelIcon}
                        src={iconImg}
                      />
                    )}
                    <Typography>{catgryNm}</Typography>
                  </Box>
                }
              >
                {child?.map((item: any, index: number) => {
                  return (
                    <ButtonBase
                      key={index}
                      onClick={() => {
                        props.onSubmit(item.catgryCd, item.brandCd);
                      }}
                      sx={styles.subTreeItemRoot}
                    >
                      <Box sx={styles.subTreeItemLabelRoot}>
                        {/* {iconImg && (
                        <Image
                          alt="drawerSubIcon"
                          css={styles.subTreeItemLabelIcon}
                          src={iconImg}
                        />
                      )} */}
                        <Typography sx={styles.subTreeItemLabel}>
                          {item.catgryNm}
                        </Typography>
                      </Box>
                    </ButtonBase>
                  );
                })}
              </TreeItem>
            )
          )}
        </TreeView>
      )}
    </SwipeableDrawer>
  );
};
export default BottomMenuDrawer;
