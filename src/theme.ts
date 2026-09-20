import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {main: '#000000' },
    secondary: {main: '#6B9F5B' }, // green used for "Register now"
    text: {primary: '#111111', secondary: '#6B6B6B' },
  },
  typography: {
    fontFamily:'"Poppins", "Helvetica", "Arial", sans-serif',
  },
  shape:{borderRadius: 8 },
});