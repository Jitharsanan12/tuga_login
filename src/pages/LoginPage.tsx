import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LoginForm from '../components/LoginForm';
import IllustrationPanel from '../components/IllustrationPanel';

export default function LoginPage() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', p: { xs: 0, md: 3 }, gap: 3 }}>
      {/* Left side: form in the middle, register link pinned to the bottom */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LoginForm />
        </Box>

        <Typography sx={{ fontSize: 13, pt: 4 }}>
          Not a member?{' '}
          <Link href="#" underline="hover" color="secondary" sx={{ fontWeight: 500 }}>
            Register now
          </Link>
        </Typography>
      </Box>

      {/* Right side: illustration panel (hidden on mobile) */}
      <IllustrationPanel />
    </Box>
  );
}