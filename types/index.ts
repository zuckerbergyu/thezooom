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
  dlvAmt?: number; // 0 : 무료배송
  dlvAmtCd?: string; //0 : 무료배송
  eventBadge?: string | null; // 뱃지 url
  goodsCustmrAmt: number; // 소비자 가격
  goodsDisplIcon?: string | null; // 신원 미상
  goodsImg: string; // 썸네일 이미지
  goodsMakerNm?: string; // 제조사 OMIT
  goodsNm: string; // 상품 이름
  goodsSellAmt?: number; // 할인 가격
  goodsSellCnt?: number; // 신원 미상
  goodsSeq: number; // 상품 코드 -> 상품 상세 id로 사용
  goodsStockStatusCd?: string; // 0001,0002,0005 재고없음=품절, 0000 재고 있음
  rowNum?: number; // 1부터 시작, 리스트안에서 순서
  rowNumCnt?: number; // 총 개수
  viewRowCnt?: number; // 리스트 조회 개수 , default=20
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
  memSeq: string; //'100000000516';
  basicYn: YnType; //'Y';
  orderPayCd: string; //'0001';
  orderTotalAmt: number; // 305500;
  orderGoodsNm: string; // 'NEW 충성 핫팩(대형/중형/소형/발난로/깔창핫팩) 택1외 2건'; TODO:뒤에데이터가공
  ordererNm: string; // '주문고객 이름'
  ordererHp: string; //'01022740450';
  isOrdererHp: YnType; //'Y';
  ordererEmail: string; // 'hue@email.com';
  orderSeq: number; // 200000020190;
  orderUsePoint: number; //0;
  dlvAddrSeq: number; //5310;
  rcverNm: string; // '이세규';
  rcverHp: string; //'01022740450';
  rcvPost: string; // '08807';
  rcvAddr: string; //'서울 관악구 승방6길 10';
  rcvAddrDetail: string; //'803호';
  pointCnl: string; // '9000';
  deviceType: DeviceType; // 1:pc, 2:mobilie
  encId: string; // '';
  encPwd: string; // '';
  siteCode: string; // '';
  rcvAddrCode: string; //'11620';
  orderDlvMsg: string; // '배송요청사항 직접 입력';
}
export interface Category {
  catgryCd: string; // 카테고리코드 101, 101101
  brandCd: string;
  catgryNm: string; // 캠핑, 운동 ..
  catgryPath: string; // breadcrumb
  catgryPathCd: string; // 상위랑 합쳐서, 만약 상위면 상위만 ex) 101|101101
  iconUrl?: string; // 신원미상
  iconImg?: string;
  isChild?: 'Y' | 'N'; // Y 는 1뎁스, N 은 2뎁스
  lv: LvType; // 뎁스 1:대분류, 2 :소분류
  mappingUrl?: string; // 신원미상 / breadcrumb
  upCatgryCd?: string; // 상위 뎁스 카테고리 넘버
  child?: Category[];
}
export interface GoodsEventInfo {}
export type YnType = 'Y' | 'N';
export type LvType = 1 | 2;
export type DeviceType = 1 | 2;
