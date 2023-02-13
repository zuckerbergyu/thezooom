import React from 'react';
import { SxProps } from 'libs/sx';
import { Stack, Box, Typography, InputBase, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { styles } from './styles';

type Props = {
  sx?: SxProps;
  placeholder?: string | null;
  label?: string | null;
  value: string;
  onChange: (value: string) => void;
  isRequired?: boolean;
  disabled?: boolean;
  multiLine?: boolean;
  type?: string;
};

const TextField = (props: Props) => {
  return (
    <Stack sx={styles.root}>
      {/* input label */}
      {props.label && (
        <Box sx={styles.labelRoot}>
          <Typography sx={styles.label}>{props.label}</Typography>
          {props.isRequired && (
            <Typography sx={styles.labelIcon}> *</Typography>
          )}
        </Box>
      )}
      {/* input filed */}
      <Stack direction="row" sx={{ width: '100%' }}>
        <Box sx={styles.form}>
          <InputBase
            inputProps={{ maxLength: 255 }}
            multiline={props.multiLine}
            rows={props.multiLine ? 10 : 1}
            sx={[styles.input, props.multiLine ? styles.multiLineInput : null]}
            disabled={props.disabled}
            placeholder={props.placeholder || ''}
            value={props.value}
            onChange={(e) => {
              props.onChange(e.target.value);
            }}
            name="textField"
            autoComplete="off"
            type={props.type}
          />
          {props.value.length > 0 && !props.disabled && !props.multiLine ? (
            <IconButton
              sx={styles.close}
              onClick={() => {
                props.onChange('');
              }}
            >
              <CloseIcon sx={styles.closeIcon} />
            </IconButton>
          ) : null}
        </Box>
      </Stack>
    </Stack>
  );
};

export default TextField;
