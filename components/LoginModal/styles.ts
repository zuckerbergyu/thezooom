import { Colors } from 'constants/theme';
export const styles = {
  root: {},
  contentsRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    height: 'auto',
  },
  textFieldRoot: {
    marginBottom: '10px',
    width: '100%',
  },

  authAreaRoot: {
    display: 'flex',
    width: '100%',
    marginBottom: '20px',
  },
  authTextField: { width: '60%' },
  authTimerArea: { width: '40%', display: 'flex' },
  authTimer: {
    width: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authTimerTxt: { color: Colors.black, fontSize: '20px', fontWeight: 700 },
  sendAuthNumberBtn: { background: Colors.black, width: '100%' },
  sendAuthNumberBtnTxt: {
    color: Colors.white,
    fontWeight: 700,
    fontSize: '14px',
    wordBreak: 'keep-all',
  },

  infoTxtRoot: {
    display: 'flex',
    justifyContent: 'center',
  },
  infoTxt: { fontSize: '14px' },

  warningTxtRoot: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  warningTxt: { color: Colors.red, fontSize: '14px' },

  submitBtnRoot: {
    borderRadius: '12px',
    background: Colors.black,
    padding: '10px 20px',
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
    margin: '0px 20px 20px',
  },
  btnTxt: {
    color: Colors.white,
    fontSize: '18px',
    fontWeight: 600,
  },
};
