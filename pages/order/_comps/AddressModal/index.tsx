import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useContext as useConfirmContext } from 'contexts/confirm';
import {
  useGetAddress,
  useGetAddressDelete,
  useGetAddressSubmit,
} from 'apis/index';
import AddAddress from 'components/AddAddress';
import ResponsiveModal from 'components/ResponsiveModal';
import Empty from 'components/Empty';
import { NO_ADDRESS_LIST } from 'constants/meta';
import { SxProps } from 'libs/sx';
import AddressItem from '../AddressItem';
import { styles } from './styles';

// TODO: 배송지 수정: api 확인후 추가
type Props = {
  sx?: SxProps;
  open: boolean;
  onClose: () => void;
  address: any;
  setAddress: (value: any) => void;
};
const AddressModal = (props: Props) => {
  const [, confirmActions] = useConfirmContext();
  const [formState, setFormState] = useState({
    open: false,
    title: '배송지 선택',
  });

  const [curAddressIndex, setCurAddressIndex] = useState(0); // 현재 선택된 배송지 index
  const [deleteItem, setDeleteItem] = useState({}); // 배송지 삭제 params

  const [addressAlias, setAddressAlias] = useState(''); // 주소 별칭
  const [recipient, setRecipient] = useState(''); // 수령인
  const [address, setAddress] = useState(''); // 기본주소
  const [zipCode, setZipcode] = useState(''); // 우편번호
  const [sigunguCode, setSigunguCode] = useState(''); // 시군구 코드
  const [detailAddress, setDetailAddress] = useState(''); // 사용자 작성 상세주소
  const [phoneNumber, setPhoneNumber] = useState(''); // 사용자 작성 상세주소
  const [checked, setChecked] = useState(false);

  // 배송지 등록 param / FIXME: 없어도 등록하는데 문제가 없음 -> api 문서 참조해서 필수값 찾고 Type 설정하기
  const resultAddressInfo = {
    dlvAddrSeq: 0, // FIXME: 무엇인지 확인 필요
    addrNick: addressAlias,
    rcverNm: recipient,
    rcvPost: zipCode,
    rcvAddr: address,
    rcvAddrDetail: detailAddress,
    rcvAddrCode: sigunguCode,
    reverTel: '',
    rcverHp: phoneNumber,
    basicYn: checked ? 'Y' : 'N',
  };

  // 배송지 리스트 api
  const {
    data: addressListData,
    isSuccess: addressRequestSuccess,
    refetch: fetchAddressList,
  } = useGetAddress();

  // 배송지 등록 api
  const {
    data: addressSubmitData,
    isSuccess: addressSubmitIsSuccess,
    refetch,
  } = useGetAddressSubmit(resultAddressInfo);

  // 배송지 삭제 api
  const { data: addressDeleteData, isSuccess: addressDeleteSuccess } =
    useGetAddressDelete(deleteItem);

  // 최초 진입시 api호출
  useEffect(() => {
    fetchAddressList();
  }, []);

  // 배송지 리스트
  const addressList = useMemo(() => {
    if (addressListData && addressRequestSuccess) {
      const list = addressListData.result.list;
      return list;
    }
    return [];
  }, [addressListData]);

  // 기본 배송지 세팅 / 선택된 배송지 체크를위한 index 상태 저장
  useEffect(() => {
    if (addressList.length > 0) {
      const basicAddressIndex = addressList.findIndex(
        (item: any) => item.basicYn === 'Y'
      );
      const basicAddress = addressList.filter(
        (item: any) => item.basicYn === 'Y'
      );
      if (basicAddress.length > 0) {
        props.setAddress(basicAddress[0]);
        setCurAddressIndex(basicAddressIndex);
      } else {
        props.setAddress(addressList[0]);
        setCurAddressIndex(0);
      }
    } else {
      props.setAddress(null);
    }
  }, [addressList]);

  // 배송지 삭제
  const onDelete = (idx: number) => {
    if (idx === 0 && addressList.length === 1) {
      confirmActions.open('알림', '마지막 배송지입니다');
    } else {
      confirmActions
        .open('알림', '배송지를 삭제하시겠습니까?', ['취소', '확인'])
        .then(async (answer) => {
          if (answer === '확인') {
            const deleteList = addressList.filter(
              (_: any, index: number) => index === idx
            );
            setDeleteItem({ delList: deleteList });
          }
        });
    }
  };

  // 배송지 삭제후 처리
  useEffect(() => {
    if (addressDeleteData && addressDeleteSuccess) {
      setDeleteItem({});
      fetchAddressList();
    }
  }, [addressDeleteData, addressDeleteSuccess]);

  // 배송지 등록 완료후 처리
  useEffect(() => {
    if (addressSubmitData && addressSubmitIsSuccess) {
      confirmActions
        .open('알림', '배송지 등록이 완료되었습니다.')
        .then(async (answer) => {
          fetchAddressList();

          setAddressAlias('');
          setRecipient('');
          setAddress('');
          setZipcode('');
          setSigunguCode('');
          setDetailAddress('');
          setPhoneNumber('');
          setChecked(false);

          setFormState({ title: '배송지 선택', open: false });
        });
    }
  }, [addressSubmitData]);

  return (
    <ResponsiveModal
      open={props.open}
      onClose={
        formState.open
          ? () => {
              setFormState({ title: '배송지 선택', open: false });
            }
          : props.onClose
      }
      title={formState.title}
      sx={styles.root}
    >
      {formState.open ? (
        <AddAddress
          onSubmit={() => {
            refetch();
          }}
          addressAlias={addressAlias}
          recipient={recipient}
          address={address}
          zipCode={zipCode}
          sigunguCode={sigunguCode}
          detailAddress={detailAddress}
          phoneNumber={phoneNumber}
          checked={checked}
          setAddressAlias={(value) => setAddressAlias(value)}
          setRecipient={(value) => setRecipient(value)}
          setAddress={(value) => setAddress(value)}
          setZipcode={(value) => setZipcode(value)}
          setSigunguCode={(value) => setSigunguCode(value)}
          setDetailAddress={(value) => setDetailAddress(value)}
          setPhoneNumber={(value) => setPhoneNumber(value)}
          setChecked={(value) => setChecked(value)}
        />
      ) : (
        <Box sx={styles.addressRoot}>
          <Box sx={styles.submitAddressRoot}>
            <Box
              sx={styles.submitAddressBtnRoot}
              onClick={() => {
                setFormState({ title: '배송지 등록', open: true });
              }}
            >
              <Typography sx={styles.submitAddressTxt}>
                + 신규배송지 등록
              </Typography>
            </Box>
          </Box>
          {addressList.length > 0 ? (
            addressList.map((item: any, index: number) => (
              <AddressItem
                isModalView
                key={index}
                data={item}
                index={index}
                onDelete={onDelete}
                selectedIndex={curAddressIndex}
                onSelect={(value) => {
                  const selectIndex = addressList.findIndex(
                    (item: any) => item.dlvAddrSeq === value.dlvAddrSeq
                  );
                  if (selectIndex !== curAddressIndex) {
                    setCurAddressIndex(selectIndex);
                    props.setAddress(value);
                    props.onClose();
                  } else {
                    props.onClose();
                  }
                }}
              />
            ))
          ) : (
            <Empty text={NO_ADDRESS_LIST} />
          )}
          <Box sx={styles.addressListRoot}></Box>
        </Box>
      )}
    </ResponsiveModal>
  );
};

export default AddressModal;
