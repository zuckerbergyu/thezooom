export const styles = {
  root: {},
  headerRoot: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    fontSize: '20px',
    justifyContent: 'center',
  },
  headerTxt: { fontSize: '20px', color: 'black' },
  bodyRoot: { margin: '28px 20px' },
  textFieldRoot: { margin: '10px 0px' },
  zipCodeRoot: { margin: '10px 0px', display: 'flex', width: '100%' },
  zipCodeBtnRoot: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '32px',
  },
  zipCodeBtn: {
    height: '46px',
    marginLeft: '4px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    borderColor: '#8a8a8a',
    borderStyle: 'solid',
    borderWidth: '1px',
  },
  phoneNumberRoot: { margin: '14px 0px' },
  checkBox: { color: 'black', '&.Mui-checked': { color: 'black' } },

  submitBtn: {
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    // 전체너비로 할경우 주석해제하고 maxwidth 삭제
    maxWidth: '1000px',
    // left: 0,
    // right: 0,
    fontWeight: 700,
    fontSize: '19px',
    width: '100vw',
    height: '64px',
    color: 'white',
    background: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
  },
};