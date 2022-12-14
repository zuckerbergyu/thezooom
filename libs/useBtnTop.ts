import { useEffect } from 'react';
import { useBtnTopContext } from 'contexts/btnTop';

const useBtnTop = () => {
  const { btnTop, setBtnTop } = useBtnTopContext();
  useEffect(() => {
    if (!btnTop) {
      setBtnTop(true);
    }
    return () => {
      if (btnTop) {
        setBtnTop(false);
      }
    };
  }, [btnTop]);
};
export default useBtnTop;
