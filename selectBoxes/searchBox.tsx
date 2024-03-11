import { TextField, styled, Divider } from '@mui/material';

const SearchBox = styled(TextField)({
  marginTop: '0px',
  marginBottom: '0px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
    '& input': {
      padding: '10px 10px',
    },
  },
});

export default SearchBox;

export const SelectDivider = styled(Divider)({
  '&.MuiDivider-root': {
    marginTop: '0px',
    marginBottom: '0px',
  },
});
