'use client'
// pages/index.js
import React from 'react'
import { useRouter } from 'next/navigation';
import { Box, Button, Typography, Container, Stack, useTheme } from '@mui/material';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const handleSignup = () => {
    router.push('/Signup'); // Navigate to the signup page
  };

  const handleSignin = () => {
    router.push('/Signin'); // Navigate to the signin page
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default, // Default background color
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 4,
      }}
    >
      <Container maxWidth="sm" sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Your Studybuddy
        </Typography>
        <Typography variant="h5" paragraph>
        Plan, Prioritize, and Achieve Your Study Goals
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignup}
            sx={{ padding: '10px 20px', fontSize: '16px' }}
            disabled={isLoading}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSignin}
            sx={{ padding: '10px 20px', fontSize: '16px' }}
            disabled={isLoading}
          >
            Sign In
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

