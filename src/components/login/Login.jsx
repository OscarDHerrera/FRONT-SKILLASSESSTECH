import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const Login = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Login
      </Typography>
      <Box sx={{ width: '300px' }}>
        <TextField label="Username" fullWidth sx={{ mb: 2 }} />
        <TextField label="Password" type="password" fullWidth sx={{ mb: 2 }} />
        <Button variant="contained" fullWidth>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
