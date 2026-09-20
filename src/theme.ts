import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#000000' },
    secondary: { main: '#6B9F5B' }, // green used for "Register now"
    text: { primary: '#111111', secondary: '#6B6B6B' },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 8 },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          fontSize: 14,
          '& fieldset': { borderColor: '#555555' },
        },
        input: {
          padding: '15px 32px',
          '&::placeholder': { color: '#9E9E9E', opacity: 1 },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 50, textTransform: 'none', fontWeight: 600 },
      },
    },
  },
});