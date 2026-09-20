import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { auth } from '../firebase/config';
import { TOKEN_STORAGE_KEY } from '../firebase/auth';

export default function TokenPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const accessToken = sessionStorage.getItem(TOKEN_STORAGE_KEY);

  // nobody signed in? Send them back to the login page.
  if (!accessToken) return <Navigate to="/" replace />;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(accessToken);
    setCopied(true);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 640 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          You’re signed in
        </Typography>
        <Typography sx={{ mt: 1, mb: 3, color: 'text.secondary', fontSize: 14 }}>
          This is your Google access token:
        </Typography>

        <Box
          sx={{
            p: 2,
            bgcolor:'#F4F8EE',
            borderRadius: 3,
            maxHeight: 220,
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: 13,
            wordBreak: 'break-all',
          }}
        >
          {accessToken}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button variant="contained" disableElevation onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy token'}
          </Button>
          <Button variant="outlined" color="inherit" onClick={handleSignOut}>
            Sign out
          </Button>
        </Box>
      </Box>
    </Box>
  );
}