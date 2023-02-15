import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useContext as useConfirmContext } from '../contexts/confirm';

export default function AlertDialog() {
  const [state, actions] = useConfirmContext();
  const [value, setValue] = useState('');

  useEffect(() => {
    if (state.isOpen) {
      if (state.input) {
        setValue(state.input.value);
      }
    }
  }, [state]);
  return (
    <Dialog
      open={state.isOpen}
      onClose={() => {
        if (state.resolve) state.resolve(false);
        actions.close();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
      sx={styles.dialog}
    >
      <DialogTitle id="alert-dialog-title">{state.title}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ whiteSpace: 'pre-line' }}
        >
          {state.body}
        </DialogContentText>
        {state.input ? (
          <TextField
            autoFocus
            margin="dense"
            label={state.input.label}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type={state.input.type || 'text'}
            fullWidth
            disabled={state.input.disabled || false}
            variant={(state.input.variant as any) || 'standard'}
            placeholder={state.input.placeholder || ''}
            multiline={state.input.multiline || false}
          />
        ) : null}
      </DialogContent>
      <DialogActions>
        {state.buttons.map((button) => (
          <Button
            key={button}
            sx={{ textTransform: 'none', color: 'black' }}
            onClick={() => {
              if (state.resolve) {
                if (state.input) {
                  state.resolve({ button, value });
                } else {
                  state.resolve(button);
                }
              }
              actions.close();
            }}
          >
            {button}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}
const styles = {
  dialog: {
    zIndex: 2000,
  },
};
