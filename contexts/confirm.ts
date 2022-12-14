import { Dispatch } from 'react';
import createDataContext from './createDataContext';

type Input = {
  label: string;
  type?: 'number' | 'text' | null;
  value: string;
  multiline?: boolean;
  placeholder?: string;
  variant?: string;
  disabled?: boolean;
};
interface State {
  isOpen: boolean;
  title: string;
  body: string;
  buttons: string[];
  input?: Input | null;
  resolve: ((v: any) => void) | null;
}
type ActionType =
  | {
      type: 'open';
      payload: {
        title: string;
        body: string;
        buttons: string[];
        input?: Input | null;
        resolve: (v: any) => void;
      };
    }
  | { type: 'close' };

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case 'open': {
      return {
        ...state,
        isOpen: true,
        title: action.payload.title,
        body: action.payload.body,
        buttons: action.payload.buttons,
        input: action.payload.input,
        resolve: action.payload.resolve,
      };
    }
    case 'close': {
      return {
        ...state,
        isOpen: false,
        resolve: null,
      };
    }
    default:
      return state;
  }
};

const open = (dispatch: Dispatch<ActionType>) => {
  return <T extends readonly string[]>(
    title: string,
    body: string,
    buttons?: T,
    input?: Input | null
  ): Promise<
    | T[number]
    | {
        button: T[number];
        value: string;
      }
  > => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'open',
        payload: {
          title,
          body: body || '',
          buttons: buttons || (['확인'] as any),
          input,
          resolve,
        },
      });
    });
  };
};

const close = (dispatch: Dispatch<ActionType>) => {
  return () => {
    dispatch({
      type: 'close',
    });
  };
};
export const { useContext, Provider } = createDataContext(
  reducer,
  { open, close },
  {
    isOpen: false,
    title: '',
    body: '',
    buttons: ['close'],
    input: null,
    resolve: null,
  }
);
