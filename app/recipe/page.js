'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Box, Typography,Modal,Stack,TextField,Button,textFieldStyle,Card,CardContent} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchAppBar from '../components/appbarwosearch';
import OutlinedCard from '../components/cards'
import {Grid} from '@mui/material';
import {doc,addDoc,collection, query, onSnapshot, getDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebase';
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
  const [recipe,setrecipe]=useState('');
  const [handler,sethandler]=useState(false);
  
  const [inventory,setinventory]=useState([]);
  
  
  useEffect(()=>{
    const uid = localStorage.getItem('userid');
     const userref = collection(db,'users',uid,'items');
     const users = query(userref);
     const u = onSnapshot(users,(q)=>{
      const itemsArr = [];
      q.forEach((doc)=>{
        itemsArr.push(doc.data().name)
      })
       setinventory(itemsArr);
     })
     
  },[])
  

  const generateRecipe = async()=>{
    const data = inventory;
    const response = await fetch('/api/recipesug',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json', // Add this header
      },
      body: JSON.stringify(data)
    });
    const newdata = await response.json();
    setrecipe(newdata.data); 
   
  }
  const changehandler = ()=>{
    const newhandler = !handler;
    sethandler(newhandler);
    //it takes time for the handler to change that is why by default we use !handler in if check
    if(!handler){
      generateRecipe();
    }
  }
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

  <Box
    width="100vw"
    minHeight="100vh" // Use minHeight instead of height to allow content to dictate height
    display="flex"
    flexDirection="column"
    alignItems="center" // Center content horizontally
    justifyContent="flex-start" // Align content at the top
    paddingTop={4} // Optional: Add some padding to the top if desired
  >
    <Box sx={{ width: '100%', maxWidth: 600, padding: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={changehandler}
            fullWidth
            sx={{ mb: 4 }}
          >
            Generate Recipe
          </Button>
          {recipe && (
            <Box>
              <Typography variant="h6">Generated Recipe:</Typography>
              {recipe.recipe_name && (
                <Typography variant="body1">
                  <strong>{recipe.recipe_name}</strong>
                </Typography>
              )}
              <Typography variant="body1"><strong>Ingredients:</strong></Typography>
              <ul>
                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                  recipe.ingredients.map((ingredient, index) => (
                    
                      <Typography key={index}>{ingredient}</Typography>
                    
                  ))
                ) : (
                  <Typography>No ingredients available.</Typography>
                )}
              </ul>
              <Typography variant="body1"><strong>Instructions:</strong></Typography>
              <ol>
                {recipe.instructions && recipe.instructions.length > 0 ? (
                  recipe.instructions.map((instruction, index) => (
                    
                      <Typography key={index}>{instruction}</Typography>
                    
                  ))
                ) : (
                  <Typography>No instructions available.</Typography>
                )}
              </ol>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  </Box>
</Box>

  );
}
