import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import AddShippingAddress from 'components/AddAddress';
import Divider from 'components/Divider';
import { useContext as useConfirmContext } from 'contexts/confirm';
import { useGetAddressSubmit } from 'apis/index';
import { styles } from './styles';

const AddAddress = () => {
  const router = useRouter();
  const [, confirmActions] = useConfirmContext();

  const [addressAlias, setAddressAlias] = useState(''); // 주소 별칭
  const [recipient, setRecipient] = useState(''); // 수령인
  const [address, setAddress] = useState(''); // 기본주소
  const [zipCode, setZipcode] = useState(''); // 우편번호
  const [sigunguCode, setSigunguCode] = useState(''); // 시군구 코드
  const [detailAddress, setDetailAddress] = useState(''); // 사용자 작성 상세주소
  const [phoneNumber, setPhoneNumber] = useState(''); // 사용자 작성 상세주소
  const [checked, setChecked] = useState(false);

  // TODO: ref 추가하여 커서 이동 시키기 참고:src/components/AddShippingAddress/index.js
  // const subAddressRef = useRef();

  // FIXME: 없어도 등록하는데 문제가 없음 -> api 문서 참조해서 필수값 찾고 Type 설정하기
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

  // 배송지 등록 api
  const { data, isSuccess, refetch } = useGetAddressSubmit(resultAddressInfo);

  // 배송지 등록 완료후 처리
  useEffect(() => {
    if (data && isSuccess) {
      confirmActions
        .open('알림', '배송지 등록이 완료되었습니다.')
        .then(async (answer) => {
          router.replace('/mypage?tabType=add');
        });
    }
  }, [data]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.headerRoot}>
        <Typography sx={styles.headerTxt}>배송지 등록</Typography>
      </Box>
      <Divider size={1} />
      <AddShippingAddress
        isFixedBottomBtn
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
    </Box>
  );
};

export default AddAddress;
