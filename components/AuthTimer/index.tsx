import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { SxProps } from 'libs/sx';
import { styles } from './styles';

type Props = {
  min: number;
  sec: number;
  sx?: SxProps;
  active: boolean;
  onFinishTimer: () => void;
  setMin: (min: number) => void;
  setSec: (sec: number) => void;
};
const AuthTimer = (props: Props) => {
  useEffect(() => {
    if (props.active) {
      const timer = setInterval(() => {
        if (props.sec > 0) {
          props.setSec(Number(props.sec) - 1);
        }
        if (props.sec === 0) {
          if (props.min === 0) {
            clearInterval(timer);
            props.onFinishTimer();
          } else {
            props.setMin(Number(props.min) - 1);
            props.setSec(59);
          }
        }
      }, 1000);
      return () => clearInterval(timer);
    }
    return () => {};
  }, [props.min, props.sec, props.active]);

  return (
    <Typography sx={{ ...styles.time, ...props.sx }}>
      {props.min}:{props.sec < 10 ? `0${props.sec}` : props.sec}
    </Typography>
  );
};

export default AuthTimer;
