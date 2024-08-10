// src/components/AddIngredient.js
'use client'
import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';

const AddIngredient = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddItem = () => {
    if (itemName && description) {
      onAddItem(itemName, description);
      setItemName(''); // Clear the input fields
      setDescription('');
    } else {
      alert('Please fill out both fields!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 3,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Add New Ingredient
        </Typography>
        <TextField
          label="Item Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleAddItem}
        >
          Add Item
        </Button>
      </Box>
    </Container>
  );
};

export default AddIngredient;
