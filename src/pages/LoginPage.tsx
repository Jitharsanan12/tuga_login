import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function LoginPage() {
  return (
    <Box sx={{ display: 'flex',minHeight: '100vh', p: { xs: 0, md: 3 }, gap: 3 }}>
      {/* Left side: the form will go here */}
      <Box
        sx={{
          flex:1,
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          p: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Welcome back!
        </Typography>
      </Box>

      {/* Right side: illustration panel, hidden on mobile */}
      <Box
        sx={{
          flex:1,
          display:{ xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent:'center',
          bgcolor:'#F4F6F1',
          borderRadius: 3,
        }}
      >
        <Typography color="text.secondary">Illustration goes here</Typography>
      </Box>
    </Box>
  );
}