import React, { useRef } from 'react';
import { Dialog } from '@mui/material';
import { styles } from './styles';

type Props = {
  open: boolean;
  iframeSrc: string;
};
// TODO: onLoad 또는 다른 방법을 이용하여 iframe 로딩중인 상태 처리
const PaymentModal = (props: Props) => {
  const iframeRef = useRef(null);
  const onLoad = (e: any) => {};
  return (
    <Dialog maxWidth={false} open={props.open} sx={styles.root}>
      <iframe
        ref={iframeRef}
        id={'iframeTest'}
        src={props.iframeSrc}
        width={'832px'}
        height={'600px'}
        frameBorder="none"
        style={styles.iframe}
        onLoad={onLoad}
      ></iframe>
    </Dialog>
  );
};

export default PaymentModal;
