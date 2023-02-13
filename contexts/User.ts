import { createContext, useContext } from 'react';
import { User } from 'types';

interface Context {
  user: User | null;
  setBrandLogin: (isBrandLogin: boolean) => void;
}

export const UserContext = createContext<Context>({
  user: null,
  setBrandLogin: () => {},
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
