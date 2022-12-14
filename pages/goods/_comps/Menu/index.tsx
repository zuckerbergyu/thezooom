import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { styles } from './styles';
import { SxProps } from 'libs/sx';

type Props = {
  sx?: SxProps;
  tabLabels?: string[];
  value?: number;
  onSelect: (index: number) => void;
};
const Menu = (props: Props) => {
  return (
    <Box sx={styles.root}>
      <Tabs
        value={props.value}
        onChange={(_, index) => props.onSelect(index)}
        variant="fullWidth"
        // indicatorColor="grey"
        sx={styles.tabs}
      >
        {props.tabLabels?.map((label, index) => {
          return <Tab key={index} sx={styles.tab} label={label} />;
        })}
      </Tabs>
    </Box>
  );
};

export default Menu;
