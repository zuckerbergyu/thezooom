import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import AddShippingAddress from 'components/AddAddress';
import Divider from 'components/Divider';
import { useContext as useConfirmContext } from 'contexts/confirm';
import { member as memberApi } from 'apis';
import { Address } from 'types';
import { styles } from './styles';

const AddAddress = () => {
  const router = useRouter();
  const [, confirmActions] = useConfirmContext();

  const [addressAlias, setAddressAlias] = useState('');
  const [recipient, setRecipient] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipcode] = useState('');
  const [sigunguCode, setSigunguCode] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checked, setChecked] = useState(false);

  const resultAddressInfo: Address = {
    dlvAddrSeq: 0,
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
  const { data, isSuccess, refetch } =
    memberApi.useGetAddressSubmit(resultAddressInfo);

  // 배송지 등록 완료후 처리
  useEffect(() => {
    if (data && isSuccess) {
      confirmActions
        .open('알림', '배송지 등록이 완료되었습니다.')
        .then(async () => {
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
