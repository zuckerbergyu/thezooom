import { createTheme } from '@mui/material/styles';

// Create a theme instance.
export const Colors = {
  primary: {
    500: '#4444FF',
    400: '#7777FF',
    300: '#AAAAFF',
    200: '#CCCCFF',
    100: '#EEEEFF',
  },
  secondary: {
    500: '#FF4444',
    400: '#FF7777',
    300: '#FF9999',
    200: '#FFBBBB',
    100: '#FFEEEE',
  },
  grey: {
    900: '#212121',
    800: '#424242',
    700: '#616161',
    600: '#757575',
    500: '#9e9e9e',
    400: '#bdbdbd',
    300: '#e0e0e0',
    200: '#eeeeee',
    100: '#f5f5f5',
    50: '#fafafa',
  },
  background: '#fff',
  error: '#FF4444',
};
const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#5ec2d5',
    },
    error: {
      main: Colors.error,
    },
    grey: Colors.grey,
  },
  typography: {
    fontFamily: [
      // '-apple-system',
      // 'BlinkMacSystemFont',
      // 'Apple SD Gothic Neo',
      // 'Pretendard',
      // 'Roboto',
      'Noto Sans KR',
      // 'Segoe UI',
      // 'Malgun Gothic',
      // 'Apple Color Emoji',
      // 'Segoe UI Emoji',
      // 'Segoe UI Symbol',
      // 'sans-serif',
    ].join(','),
  },
  components: {},
});

export default theme;
