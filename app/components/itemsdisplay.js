import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CustomCard from './cards'; // Ensure this path is correct
import { db } from '../firebase';
import { doc, collection, query, onSnapshot, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function OutlinedCard() {
  const [inventory, setInventory] = useState([]);
  const [userid, setUserid] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userid');
    setUserid(storedUserId); // Set userid from localStorage

    if (!storedUserId) {
      console.error('User ID is not available in localStorage');
      return;
    }

    const userDoc = doc(db, 'users', storedUserId);
    const itemsQuery = query(collection(userDoc, 'items'));

    const unsubscribe = onSnapshot(itemsQuery, (snapshot) => {
      let itemsArr = [];
      snapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id, id1: storedUserId });
      });
      setInventory(itemsArr);
    }, (error) => {
      console.error('Error fetching items:', error);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const deleteButton = async (id) => {
    try {
      const itemRef = doc(db, 'users', userid, 'items', id); // Correct path
      await deleteDoc(itemRef);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const checkboxbutton = async (id) => {
    try {
      const itemRef = doc(db, 'users', userid, 'items', id); // Correct path
      const docSnapshot = await getDoc(itemRef);
      const completed = docSnapshot.data()?.completed;

      await updateDoc(itemRef, { completed: !completed }); // Toggle completed
    } catch (error) {
      console.error('Error marking todo:', error);
    }
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Grid container spacing={2}>
        {inventory.map((item) => (
          <Grid item xs={12} key={item.id}> {/* Change this line to use xs={12} */}
            <CustomCard
              title={item.name}
              description={item.description}
              completed={item.completed} // Pass completed state
              onCheckboxChange={() => checkboxbutton(item.id)} // Handle checkbox change
              onDelete={() => deleteButton(item.id)}
              sx={{ width: '100%' }} // Ensure the CustomCard takes full width
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
