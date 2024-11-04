// pages/page.js
// src/SignUpPage.js
'use client'
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
import {auth,createUserWithEmailAndPassword} from "../firebase";
import NextLink from 'next/link'
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
   const [email,setemail]=useState('');
   const[password,setpassword]=useState('');
   const[confirmPassword,setconfirmedPassword]=useState('');
   const[error,seterror]=useState('');
   const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle sign-up logic here
    if (!emailRegex.test(email)){
      seterror("Please provide a valid email");
      return
    }
    if(!password || password==''){
       seterror("Please provide your password");
       return;
    }

    if(password!==confirmPassword){
      seterror("Passwords donot match");
      return;

    }
    seterror('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('userid',user.uid);
      router.push(`/dashboard`)
      setemail('');
      setpassword('');
      setconfirmedPassword('');
    } catch (error) {
      seterror('Error creating account: ' + error.message);
    }
  };

  return (
   
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
           {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e)=>{setemail(e.target.value)}}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={(e)=>{setpassword(e.target.value)}}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            onChange={(e)=>{setconfirmedPassword(e.target.value)}}
          />
          <Typography variant="body1" sx={{ marginTop: 2 }}>
          Already have an account? <NextLink href="/Signin" passHref><Typography component="a" color="primary">Sign In</Typography></NextLink>
        </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;


  
  