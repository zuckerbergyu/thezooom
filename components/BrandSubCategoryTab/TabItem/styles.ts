export const styles = {
  root: {
    minWidth: 0,
    minHeight: 0,
    padding: '8px 12px',
    color: 'black',
    fontWeight: 500,
    fontSize: '15px',
    overflow: 'visible',

    // 선택된 탭
    '&.Mui-selected': {
      color: 'white',
      background: 'black',
      borderRadius: '17px',

      // 하단 포인트
      '&:before': {
        width: '8px',
        height: '8px',
        content: '""',
        bottom: '-2px',
        position: 'absolute',
        backgroundColor: 'black',
        transform: 'rotate(-45deg);',
      },
    },
  },
};