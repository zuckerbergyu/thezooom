import { MobileStepper, Box, Typography } from '@mui/material';
import { SxProps } from 'libs/sx';
import { styles } from './styles';

type Props = {
  sx?: SxProps;
  totalStep: number;
  activeStep: number;
};
const ProgressBar = (props: Props) => (
  <MobileStepper
    variant="progress"
    steps={props.totalStep + 2}
    activeStep={props.activeStep + 1}
    position="static"
    sx={styles.root}
    backButton={null}
    nextButton={
      <Box sx={{ marginLeft: '12px', display: 'flex' }}>
        <Typography sx={{ fontWeight: 700, marginRight: '4px' }}>
          {props.activeStep + 1}
        </Typography>
        /
        <Typography sx={{ fontWeight: 700, marginLeft: '4px', color: 'gray' }}>
          {props.totalStep + 1}
        </Typography>
      </Box>
    }
  />
);
export default ProgressBar;
