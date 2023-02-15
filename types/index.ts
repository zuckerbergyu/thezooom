// mock폴더 참고
export interface User {
  custmrId: string;
  token: string;
  isLogin?: boolean;
  isBrandLogin?: boolean;
}
export enum StoreKey {
  USER = 'User',
  CATEGORY = 'Category',
  CART = 'Cart',
  ORDERLIST = 'OrderList',
  BREADCRUMB = 'BreadCrumb',
}
export interface Address {
  dlvAddrSeq: number;
  addrNick: string;
  rcverNm: string;
  rcvPost: string;
  rcvAddr: string;
  rcvAddrDetail: string;
  rcvAddrCode: string;
  reverTel: '';
  rcverHp: string;
  basicYn: YnType;
}
export interface DeleteAddress {
  delList: Address[];
}
export interface ProductItem {
  dlvAmt?: number;
  dlvAmtCd?: string;
  eventBadge?: string | null;
  goodsCustmrAmt: number;
  goodsDisplIcon?: string | null;
  goodsImg: string;
  goodsMakerNm?: string;
  goodsNm: string;
  goodsSellAmt?: number;
  goodsSellCnt?: number;
  goodsSeq: number;
  goodsStockStatusCd?: string;
  rowNum?: number;
  rowNumCnt?: number;
  viewRowCnt?: number;
}
export interface GoodsDetail {
  goodsInfo: GoodsInfo[];
  goodsOptions?: GoodsOptions[];
  goodsInfoAnnounce?: GoodsInfoAnnounce[];
  goodsEventInfo?: GoodsEventInfo[];
}
export interface GoodsInfo extends ProductItem {
  goodsStatusCd: string;
  goodsOptYn: string;
  goodsTexFreeAmt: number;
  notiDesc?: string | null;
  sellerId: string;
  goodsOriginArea?: string | null;
  notiGrpCd: string;
  dlvTerm: number;
  goodsStockStatusCd: string;
  catgryCd: string;
  goodsDetailInfo: string;
  dlvLimit?: string | null;
  goodsTexAmt: number;
}
export interface GoodsOptions {
  goodsOptLv: number;
  goodsOptAddSellAmt: number;
  goodsOptStockCnt: number;
  goodsSeq: string;
  goodsOptNm: string;
  goodsOptSeq: string;
  goodsOptNo: number;
  goodsOptSoldOutYn: 'Y' | 'N';
  child?: GoodsOptions[];
}
export interface GoodsInfoAnnounce {
  goodsNotiDesc: string;
  goodsNotiTitle: string;
}
export interface OrderList {
  goodsInfo: GoodsInfo | null;
  goodsOpt: GoodsOption;
  goodsOptions: GoodsOptions[] | null;
}
export interface GoodsOption
  extends Pick<
    GoodsOptions,
    'goodsOptNm' | 'goodsOptSeq' | 'goodsOptAddSellAmt' | 'goodsOptStockCnt'
  > {
  goodsOrderCnt: number;
  goodsSellAmt: number;
  id: number;
}
export interface OrderSheet {
  memSeq: string;
  basicYn: YnType;
  orderPayCd: string;
  orderTotalAmt: number;
  orderGoodsNm: string;
  ordererNm: string;
  ordererHp: string;
  isOrdererHp: YnType;
  ordererEmail: string;
  orderSeq: number;
  orderUsePoint: number;
  dlvAddrSeq: number;
  rcverNm: string;
  rcverHp: string;
  rcvPost: string;
  rcvAddr: string;
  rcvAddrDetail: string;
  pointCnl: string;
  deviceType: DeviceType;
  encId: string;
  encPwd: string;
  siteCode: string;
  rcvAddrCode: string;
  orderDlvMsg: string;
}
export interface Category {
  catgryCd: string;
  brandCd: string;
  catgryNm: string;
  catgryPath: string;
  catgryPathCd: string;
  iconUrl?: string;
  iconImg?: string;
  isChild?: 'Y' | 'N';
  lv: LvType;
  mappingUrl?: string;
  upCatgryCd?: string;
  child?: Category[];
}
export interface GoodsEventInfo {}
export type YnType = 'Y' | 'N';
export type LvType = 1 | 2;
export type DeviceType = '1' | '2';
