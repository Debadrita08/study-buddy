'use client'
import React from 'react'
import AddIngredient from './design';
import SearchAppBar from '../components/appbarwosearch';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { db } from '../firebase';
import {doc,addDoc,collection, getDoc, setDoc, getDocs,query,where} from 'firebase/firestore';
async function additems(itemname, description) {
  const userid = localStorage.getItem('userid');
  
  if (!userid) {
      console.log("User ID is not found in local storage.");
      return;
  }

  try {
      const userdocRef = doc(db, 'users', userid);
      const itemsCollectionRef = collection(userdocRef, 'items');

      // Query to check if an item with the same name already exists
      const q = query(itemsCollectionRef, where('name', '==', itemname));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
          // If no documents exist with the same item name, add a new document
          await addDoc(itemsCollectionRef, {
              name: itemname,
              description: description,
              completed:false
          });
      } else {
          // If the item already exists, update its quantity
          /*querySnapshot.forEach(async (docSnap) => {
              const docRef = docSnap.ref;
              const data = docSnap.data();
              
              // Increment quantity
              await setDoc(docRef, {
                  ...data,
                  quantity: (data.quantity || 0) + 1
              });
          });*/
      }
 
 alert("Your todo "+itemname+" got added")   } catch (e) {
      console.log("Error adding or updating item: ", e);
      alert("Your todo "+itemname+" did not get added")
  }
}

const Page = ()=>{


return(
    
    

<Box
width="100vw"
height="100vh"
display="flex"
flexDirection="column"
>
<SearchAppBar />
<Box width="100vw" height="100vh" display="flex" flexDirection="column" p={2}>
<AddIngredient onAddItem={additems}></AddIngredient>

</Box>
</Box>
)
}
export default Page;
