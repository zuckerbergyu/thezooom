import React from 'react';
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import { SxProps } from 'libs/sx';
import { styles } from './styles';

type Props = {
  sx?: SxProps;
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};
const ResponsiveModal = (props: Props) => {
  const isFullScreen = !useMediaQuery('(min-width:800px)');
  return (
    <Dialog
      maxWidth={false}
      open={props.open}
      onClose={props.onClose}
      fullScreen={isFullScreen}
      sx={styles.root}
    >
      <Box>
        <Box sx={styles.headerRoot}>
          <Typography sx={styles.titleTxt}>{props.title}</Typography>
          <Box>
            <IconButton sx={styles.closeIconBtn} onClick={props.onClose}>
              <CloseIcon sx={styles.closeIcon} />
            </IconButton>
          </Box>
        </Box>
        <Box sx={[styles.childrenRoot, !isFullScreen && styles.childrenRootPc]}>
          {props.children}
        </Box>
      </Box>
    </Dialog>
  );
};

export default ResponsiveModal;
