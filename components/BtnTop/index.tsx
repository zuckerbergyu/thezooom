import { useEffect, useState } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton } from '@mui/material';
import { styles } from './styles';

const BtnTop = () => {
  const onClick = () => {
    smoothscroll.polyfill();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [show, setShow] = useState(false);
  useEffect(() => {
    function throttleUsingRequestAnimationFrame(cb: any) {
      let rafTimeout: any = null;
      return () => {
        if (rafTimeout) {
          window.cancelAnimationFrame(rafTimeout);
        }
        rafTimeout = window.requestAnimationFrame(() => {
          cb();
        });
      };
    }

    function showBtnTop() {
      const { scrollY } = window;
      if (scrollY > 140) {
        setShow(true);
      } else {
        setShow(false);
      }
    }

    const cb = throttleUsingRequestAnimationFrame(showBtnTop);
    window.addEventListener('scroll', cb);
    return () => {
      if (cb) {
        window.removeEventListener('scroll', cb);
      }
    };
  }, []);

  return (
    <IconButton sx={[styles.root, show && styles.show]} onClick={onClick}>
      <ArrowUpwardIcon sx={styles.icon} />
    </IconButton>
  );
};

export default BtnTop;
