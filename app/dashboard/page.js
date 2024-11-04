'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Box, Typography, Modal, Stack, TextField, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchAppBar from '../components/appbarwosearch';
import OutlinedCard from '../components/itemsdisplay'; // Ensure this imports your card component
import { Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
};

const buttonStyle = {
    mt: 2,
    backgroundColor: '#6200ea',
    color: 'white',
    '&:hover': {
        backgroundColor: '#3700b3',
    },
};

export default function Dashboard() {
    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
        >
            <SearchAppBar />
            <Box width="100%" height="100%" display="flex" flexDirection="row" p={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}> {/* Make sure the card takes the full width */}
                        <OutlinedCard />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
