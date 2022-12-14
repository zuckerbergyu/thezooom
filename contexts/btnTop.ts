import { createContext, useContext } from 'react';

interface Context {
  btnTop: boolean;
  setBtnTop: (btnTop: boolean) => void;
}
export const BtnTopContext = createContext<Context>({
  btnTop: false,
  setBtnTop: () => {},
});
export const useBtnTopContext = () => {
  const context = useContext(BtnTopContext);
  return context;
};
