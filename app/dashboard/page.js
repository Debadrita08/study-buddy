'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Box, Typography,Modal,Stack,TextField,Button,textFieldStyle} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchAppBar from '../components/appbar';
import OutlinedCard from '../components/itemsdisplay'
import {Grid} from '@mui/material';
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
  }
  const buttonStyle = {
    mt: 2,
    backgroundColor: '#6200ea',
    color: 'white',
    '&:hover': {
      backgroundColor: '#3700b3',
    },
  };

export default function Dashboard() {
   // const params = new URLSearchParams(window.location.search);
    /*const [id,setid] = useState('');
    const[inventory,setinventory]=useState([]);
    const[itemname,setitemname]=useState('');
    const[handler,sethandler]=useState(true);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('userId');
        if (id) {
          setid(id);
        }
      }, []);
      const sethandleropen = ()=>{
        sethandler(true);
      }
      const sethandlerclose = ()=>{
        sethandler(false);
      }*/

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
    >
      <SearchAppBar />
      <Box width="100vw" height="100vh" display="flex" flexDirection="row" p={2}>
      <Grid container spacing={2}> {/* Adjust the spacing value as needed */}
        <OutlinedCard></OutlinedCard>
        </Grid>
    </Box>
    </Box>
  );
}
