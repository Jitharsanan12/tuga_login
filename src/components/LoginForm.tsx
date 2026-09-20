import { useState, type FormEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { FaFacebook } from 'react-icons/fa';

const socialButtonSx = {
  bgcolor: '#000',
  color: '#fff',
  width: 58,
  height: 58,
  '&:hover': { bgcolor: '#333' },
};

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // validation will be added in the next stage
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 412 }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{ fontWeight: 700, fontSize: { xs: 32, md: 44 }, lineHeight: 1.2 }}
      >
        Welcome back!
      </Typography>
      <Typography
        align="center"
        sx={{ fontSize: 13, mt: 2, mb: 6, mx: 'auto', maxWidth: 340, color: 'text.secondary' }}
      >
        Simplify your workflow and boost your productivity with{' '}
        <Box component="span" sx={{ fontWeight: 600, color: '#444' }}>
          Tuga’s App
        </Box>
        . Get started for free.
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 1.5 }}
        />

        <TextField
          fullWidth
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((prev) => !prev)}
                    sx={{ color: '#9E9E9E', mr: 0.5 }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ textAlign: 'right', mt: 1, mb: 3, pr: 1 }}>
          <Link
            component="button"
            type="button"
            underline="hover"
            color="text.primary"
            sx={{ fontSize: 12 }}
          >
            Forgot Password?
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disableElevation
          sx={{ py: 1.5, fontSize: 15 }}
        >
          Login
        </Button>
      </Box>

      <Divider sx={{ my: 4.5, fontSize: 14, color: 'text.primary' }}>or continue with</Divider>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
        <IconButton aria-label="Continue with Google" sx={socialButtonSx}>
          <GoogleIcon />
        </IconButton>
        <IconButton aria-label="Continue with Apple" sx={socialButtonSx}>
          <AppleIcon />
        </IconButton>
        <IconButton aria-label="Continue with Facebook" sx={socialButtonSx}>
          <FaFacebook size={24} />
        </IconButton>
      </Box>
    </Box>
  );
}