import { createContext, useContext } from 'react';
import { User } from 'types';

interface Context {
  user: User | null;
}

export const UserContext = createContext<Context>({
  user: null,
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
