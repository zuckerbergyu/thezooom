import { createTheme } from '@mui/material/styles';
// 전체 테마
// 정해진 ui가이드가 없어 더줌 로고 컬러를 메인으로 설정후 primary,secondary 색상 지정
// TODO : 추후 가이드가 정해지면 수정

// Create a theme instance.
export const Colors = {
  primary: {
    main: '#5ec2d5',
    900: '#13272b',
    800: '#264e55',
    700: '#387480',
    600: '#4b9baa',
    500: '#5ec2d5',
    400: '#7ecedd',
    300: '#9edae6',
    200: '#bfe7ee',
    100: '#dff3f7',
  },
  secondary: {
    main: '#d5725f',
    900: '#2b1713',
    800: '#552e26',
    700: '#804439',
    600: '#aa5b4c',
    500: '#d5725f',
    400: '#dd8e7f',
    300: '#e6aa9f',
    200: '#eec7bf',
    100: '#f7e3df',
    50: '#fbf1ef',
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
  gray: {
    900: '#000000',
    800: '#232323',
    700: '#454545',
    600: '#646464',
    500: '#787878',
    400: '#A1A1A1',
    300: '#C0C0C0',
    200: '#E3E3E3',
    100: '#F0F0F0',
    50: '#F6F6F6',
  },
  white: '#fff',
  black: '#000',
  red: '#f00',
  error: '#FF4444',
};

const theme = createTheme({
  palette: {
    primary: Colors.primary,
    secondary: Colors.secondary,
    error: {
      main: Colors.error,
    },
    grey: Colors.grey,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Apple SD Gothic Neo',
      'Pretendard',
      'Roboto',
      'Noto Sans KR',
      'Segoe UI',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'sans-serif',
    ].join(','),
  },
  components: {},
});

export default theme;
