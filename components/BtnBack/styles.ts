import theme, { Colors } from 'constants/theme';
export const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 'env(safe-area-inset-bottom)',
    width: 52,
    height: 52,
    position: 'fixed',
    left: 16,
    bottom: -60,
    zIndex: 1100,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    borderRadius: '50%',
    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.3)',
    '&:hover': {
      backgroundColor: Colors.white,
    },
    opacity: 0,
    transition: 'ease all 0.3s',
  },
  show: { bottom: 78, opacity: 1 },
  icon: {
    width: 24,
    height: 24,
    color: theme.palette.grey[600],
  },
};
