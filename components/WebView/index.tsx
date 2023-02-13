import { Button, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

/**
 * ts로 전환
 */

export const KEY = 'flutter_inappwebview';
// flutter_inappwebview.testHandler

// types/index에 선언
declare global {
  interface Window {
    thezooom: any;
    flutter_inappwebview: A;
  }
  type A = {
    callHandler: () => void;
  };
}

const WebView = () => {
  const [appUsageTimeList, setAppUsageTime] = useState<any[]>([]);

  const isWebView = () => typeof window !== 'undefined' && !!window[KEY];

  useEffect(() => {
    if (isWebView()) {
      window.thezooom = {
        callHandler: window.flutter_inappwebview.callHandler,
      };
    }
  });

  const aa = { startDate: '2022-12-11', endDate: '2022-12-23', name: 'segyu' };
  const onClickHandler = () => {
    if (window && window.thezooom) {
      window[KEY].callHandler('testHandler', aa, '두번째 파람').then(
        (arg: any) => {
          console.log('TEST APP에서 보내준 값 : ', arg);
          const a: any[] = arg && JSON.parse(arg);

          setAppUsageTime(a);
        }
      );

      // window.flutter_inappwebview.callHandler('testHandler', aa).then((arg) => {
      //   console.log('SEGYU 앱에서 리턴한값', arg);
      // });
    }
  };
  return (
    <Box>
      <Button
        sx={{
          width: '100%',
          background: 'gray',
          height: '100px',
          fontSize: '30px',
        }}
        onClick={() => {
          // window[KEY].testHandler();
          onClickHandler();
        }}
      >
        자바스크립트 인터페이스 호출
      </Button>
      {appUsageTimeList &&
        appUsageTimeList.map((item, index) => {
          return (
            <Box key={index} sx={{ borderBottom: '1px solid black' }}>
              <Typography>{item.packageName}</Typography>
              <Typography>{item.usageTime}</Typography>
            </Box>
          );
        })}
    </Box>
  );
};

export default WebView;
