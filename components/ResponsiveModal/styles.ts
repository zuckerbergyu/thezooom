export const styles = {
  root: { transformStyle: 'flat' },
  headerRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderBottom: '1px solid #e8e8e8',
    zIndex: 1000,
    position: 'sticky',
  },
  titleTxt: {
    fontSize: '18px',
    fontWeight: 700,
  },
  closeIconBtn: {
    display: 'flex',
    height: 44,
    width: 44,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1100,
  },
  closeIcon: {
    color: 'black',
    width: '20px',
    height: '20px',
  },
  childrenRoot: {
    width: '100%',
    maxHeight: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    flexShrink: 0,
  },
  childrenRootPc: {
    width: '700px',
    minHeight: '300px',
  },
};
