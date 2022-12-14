import { useRouter } from 'next/router';

const useIsMain = () => {
  const router = useRouter();
  const isMain = router.pathname === '/';
  return isMain;
};
export default useIsMain;
