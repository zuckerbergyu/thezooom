import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const ClosePopup = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      let moveUrl = 'closePopup';
      if (router.query.moveUrl) {
        moveUrl = String(router.query.moveUrl);
      }
      window.parent.parent.postMessage({ message: moveUrl }, '*');
    }
  }, [router]);
};
export default ClosePopup;
