import React from 'react';
import { Box, Typography } from '@mui/material';
import { SxProps } from 'libs/sx';
import { styles } from './styles';

type Props = {
  sx?: SxProps;
  value?: number;
  index?: number;
  children: React.ReactNode;
};

const Panel = (props: Props) => {
  return (
    <Box>
      <div
        role="tabpanel"
        hidden={props.value !== props.index}
        id={`simple-tabpanel-${props.index}`}
        aria-labelledby={`simple-tab-${props.index}`}
      >
        {props.value === props.index && (
          <Box sx={props.sx}>
            <Typography>{props.children}</Typography>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default Panel;
