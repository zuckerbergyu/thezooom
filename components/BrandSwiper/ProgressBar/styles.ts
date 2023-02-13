import { Colors } from 'constants/theme';
export const styles = {
  root: {
    padding: '0px 8px',
    '& .MuiLinearProgress-root': {
      width: '100%',
      height: '8px',
      borderRadius: '17px',
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: Colors.black,
      },
      background: '#dcdcdc',
    },
  },
};
