import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './styles';
import { SxProps } from 'libs/sx';

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
        // {...other}
      >
        {props.value === props.index && (
          <Box sx={{ p: 3 }}>
            <Typography>{props.children}</Typography>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default Panel;
