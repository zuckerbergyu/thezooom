import {
  KeyboardEvent,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  Box,
  ButtonBase,
  Typography,
  IconButton,
  SwipeableDrawer,
} from '@mui/material';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { TreeView, TreeItem } from '@mui/lab';
import { useContext as useConfirmContext } from 'contexts/confirm';
import {
  GoodsOptions as GoodsOptionsType,
  GoodsInfo as GoodsInfoType,
  GoodsOption as GoodsOptionType,
} from 'types/index';
import comma from 'libs/comma';
import { styles } from './styles';

type Props = {
  open: boolean;
  onClose: (e: KeyboardEvent | MouseEvent) => void;
  onOpen: (e: KeyboardEvent | MouseEvent) => void;
  items: [GoodsInfoType, GoodsOptionsType[] | null];
  goodsOption: GoodsOptionType[];
  setGoodsOption: (goodsOption: GoodsOptionType[]) => void;
};
const ProductSelectDrawer = (props: Props) => {
  const [, confirmActions] = useConfirmContext();

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [expanded, setExpanded] = useState(['상품옵션']);
  const handleToggle = (event: any, nodeIds: SetStateAction<string[]>) => {
    setExpanded(nodeIds);
  };

  const goodsInfo = props.items[0];
  const goodsOptions = props.items[1];

  const getQuantity = (idx: number): number => {
    const cur = props.goodsOption.findIndex(({ id }) => id === idx);
    const curCount = props.goodsOption[cur].goodsOrderCnt;
    return curCount;
  };

  const finalPrice = useMemo(() => {
    if (props.goodsOption.length > 0) {
      const priceSum = props.goodsOption.reduce((acc: any, cur) => {
        const a = Number(acc);
        const b = Number(cur.goodsOrderCnt * (cur.goodsSellAmt || 0));
        return a + b;
      }, []);
      return priceSum;
    }
    return 0;
  }, [props.goodsOption]);

  const isOptionsHasChild =
    goodsOptions && goodsOptions.length > 0 && 'child' in goodsOptions[0];

  useEffect(() => {
    if (goodsOptions && goodsOptions.length > 0 && !isOptionsHasChild) {
      const list: GoodsOptionType[] = [
        ...props.goodsOption,
        {
          goodsOptNm: goodsOptions[0].goodsOptNm,
          goodsSellAmt:
            Number(goodsInfo.goodsSellAmt) +
              goodsOptions[0].goodsOptAddSellAmt || 0,
          goodsOrderCnt: 1,
          id: 0,
          goodsOptAddSellAmt: goodsOptions[0].goodsOptAddSellAmt,
          goodsOptSeq: goodsOptions[0].goodsOptSeq,
          goodsOptStockCnt: goodsOptions[0].goodsOptStockCnt,
        },
      ];
      props.setGoodsOption(list);
    }
  }, [isOptionsHasChild]);

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
      <Box sx={styles.headerRoot}>
        <Typography sx={styles.titleTxt}>{goodsInfo.goodsNm}</Typography>
      </Box>
      <Box sx={styles.bodyRoot}>
        {isOptionsHasChild && (
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
            expanded={expanded}
            onNodeToggle={handleToggle}
            sx={styles.treeView}
          >
            {goodsOptions.map(({ goodsOptNm, child }, index) => (
              <TreeItem
                key={index}
                nodeId={goodsOptNm}
                sx={styles.mainTreeItem}
                label={<Box>{goodsOptNm}</Box>}
              >
                {child?.map((item: GoodsOptionsType, index: number) => {
                  return (
                    <ButtonBase
                      key={index}
                      onClick={() => {
                        if (
                          item.goodsOptSoldOutYn === 'Y' ||
                          item.goodsOptStockCnt === 0
                        ) {
                          return;
                        }

                        const aleadySelected = props.goodsOption.findIndex(
                          ({ id }) => id === index
                        );

                        if (aleadySelected === -1) {
                          const list: GoodsOptionType[] = [
                            ...props.goodsOption,
                            {
                              goodsOptNm: item.goodsOptNm,
                              goodsSellAmt:
                                Number(goodsInfo.goodsSellAmt) +
                                  item.goodsOptAddSellAmt || 0,
                              goodsOrderCnt: 1,
                              id: index,
                              goodsOptAddSellAmt: item.goodsOptAddSellAmt,
                              goodsOptSeq: item.goodsOptSeq,
                              goodsOptStockCnt: item.goodsOptStockCnt,
                            },
                          ];
                          props.setGoodsOption(list);
                        }
                      }}
                      sx={styles.subTreeItemRoot}
                    >
                      <Typography
                        sx={[
                          styles.subTreeItemLabel,
                          item.goodsOptSoldOutYn === 'Y' ||
                            (item.goodsOptStockCnt === 0 &&
                              styles.subTreeItemNoStock),
                        ]}
                      >
                        {item.goodsOptNm}{' '}
                        {item.goodsOptAddSellAmt > 0 && (
                          <Typography sx={styles.addSellTxt}>{`(+${comma(
                            item.goodsOptAddSellAmt
                          )}원)`}</Typography>
                        )}
                      </Typography>
                    </ButtonBase>
                  );
                })}
              </TreeItem>
            ))}
          </TreeView>
        )}
        {props.goodsOption.length > 0 && (
          <Box sx={styles.paymentCalculationRoot}>
            {props.goodsOption.map((item, index) => (
              <Box key={index} sx={styles.paymentCalculation}>
                {isOptionsHasChild && (
                  <Box sx={styles.paymentCalculationHeaderRoot}>
                    <Box>
                      <Typography sx={styles.goodsOptionTxt}>
                        {/* FIXME: 추가금액 표시할것 */}
                        {item.goodsOptNm}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton
                        sx={styles.iconRoot}
                        onClick={() => {
                          const list = [...props.goodsOption];
                          const aleadySelected = props.goodsOption.findIndex(
                            ({ id }) => id === item.id
                          );
                          list.splice(aleadySelected, 1);
                          props.setGoodsOption(list);
                        }}
                      >
                        <CancelIcon sx={styles.cancelIcon} />
                      </IconButton>
                    </Box>
                  </Box>
                )}

                <Box sx={styles.paymentCalculationBodyRoot}>
                  <Box>
                    <Box sx={styles.paymentCalculationBody}>
                      <IconButton
                        onClick={() => {
                          const cur = props.goodsOption.findIndex(
                            ({ id }) => id === item.id
                          );
                          const curCount = props.goodsOption[cur].goodsOrderCnt;
                          if (curCount > 1) {
                            const news = {
                              ...props.goodsOption[cur],
                              goodsOrderCnt: curCount - 1,
                            };

                            const list = [...props.goodsOption];
                            list.splice(cur, 1, news);
                            props.setGoodsOption(list);
                          }
                        }}
                        sx={styles.iconRoot}
                      >
                        <RemoveCircleOutlineIcon sx={styles.addRemoveIcon} />
                      </IconButton>

                      <Typography sx={styles.quantityTxt}>
                        {getQuantity(item.id)}
                      </Typography>

                      <IconButton
                        sx={styles.iconRoot}
                        onClick={() => {
                          const cur = props.goodsOption.findIndex(
                            ({ id }) => id === item.id
                          );

                          const curCount = props.goodsOption[cur].goodsOrderCnt;
                          if (
                            curCount < props.goodsOption[cur].goodsOptStockCnt
                          ) {
                            const news = {
                              ...props.goodsOption[cur],
                              goodsOrderCnt: curCount + 1,
                            };

                            const list = [...props.goodsOption];
                            list.splice(cur, 1, news);
                            props.setGoodsOption(list);
                          } else {
                            confirmActions.open(
                              '알림',
                              '구매 가능 수량을 초과하였습니다.'
                            );
                          }
                        }}
                      >
                        <AddCircleOutlineIcon sx={styles.addRemoveIcon} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography sx={styles.price}>
                    <Box>
                      {comma(item.goodsSellAmt * getQuantity(item.id))}원
                    </Box>
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Box sx={styles.finalPriceRoot}>
        <Box>
          <Typography sx={styles.finalPriceLabel}>총 상품금액</Typography>
        </Box>
        <Box>
          <Typography sx={styles.finalPrice}>{`${comma(
            finalPrice
          )}원`}</Typography>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};
export default ProductSelectDrawer;
