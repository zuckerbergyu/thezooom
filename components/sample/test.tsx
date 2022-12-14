import React, { useState, useEffect } from 'react';
import { SxProps, toArray } from 'libs/sx';
import { Box } from '@mui/material';
import { styles } from './styles';

type Props = {
  item?: string;
  sx?: SxProps;
};

const Test = ({ sx }: Props) => {
  return (
    <Box>
      <Box sx={sx}>박스1</Box>
      <Box sx={{ ...styles.listItem, ...sx }}>박스2</Box>
      <Box sx={[...toArray(sx), styles.test]}>박스3</Box>
    </Box>
  );
};

export default Test;
