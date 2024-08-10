'use client';

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
      console.error('Error fetching inventory:', error);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const incrementButton = async (id) => {
    try {
      const itemRef = doc(db, 'users', userid, 'items', id); // Correct path
      const docSnapshot = await getDoc(itemRef);
      const quantity = docSnapshot.data()?.quantity || 0;

      await updateDoc(itemRef, { quantity: quantity + 1 });
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const decrementButton = async (id) => {
    try {
      const itemRef = doc(db, 'users', userid, 'items', id); // Correct path
      const docSnapshot = await getDoc(itemRef);
      const quantity = docSnapshot.data()?.quantity || 0;

      if (quantity > 1) {
        await updateDoc(itemRef, { quantity: quantity - 1 });
      } else {
        await deleteDoc(itemRef);
      }
    } catch (error) {
      console.error('Error decrementing quantity:', error);
    }
  };

  const deleteButton = async (id) => {
    try {
      const itemRef = doc(db, 'users', userid, 'items', id); // Correct path
      await deleteDoc(itemRef);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Grid container spacing={2}>
        {inventory.map((item) => (
          <Grid item key={item.id}>
            <CustomCard
              title={item.name}
              description={item.description}
              quantity={item.quantity}
              onIncrement={() => incrementButton(item.id)}
              onDecrement={() => decrementButton(item.id)}
              onDelete={() => deleteButton(item.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
