import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { Search as SearchIcon } from 'components/Icons';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { Stack } from '@mui/material';
import { styles } from './styles';

type Props = {
  placeholder?: string | null;
  onSubmit: (value: string) => void;
  initialValue?: string;
};
const SearchField = (props: Props) => {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (props.initialValue) {
      setSearchInput(props.initialValue);
    }
  }, [props.initialValue]);

  return (
    <Stack sx={styles.root}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit(searchInput);
        }}
      >
        <Box sx={styles.form}>
          <IconButton sx={styles.search}>
            <SearchIcon color="#5ec2d5" />
          </IconButton>
          <InputBase
            sx={styles.input}
            placeholder={props.placeholder || ''}
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          {searchInput.length > 0 ? (
            <IconButton
              sx={styles.close}
              onClick={() => {
                setSearchInput('');
              }}
            >
              <CloseIcon sx={styles.closeIcon} />
            </IconButton>
          ) : null}
        </Box>
      </form>
    </Stack>
  );
};

export default SearchField;
