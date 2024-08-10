

import  React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from 'react'
import {Grid} from '@mui/material'; 


export default function CustomCard({ title, description, quantity, onIncrement, onDecrement, onDelete }) {

  return (
    <Card variant="outlined" sx={{
      width: 300,
      padding: 2,
      border: '1px solid',
      margin: 1,
      position: 'relative', // Ensure the delete icon is positioned correctly
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'scale(1.05)', // Scales the card up slightly
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Adds shadow
      },
    }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {/* Optional subtitle or description */}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
          <Box display="flex" alignItems="center">
            <Button size="small" onClick={onIncrement}>+</Button>
            <Typography sx={{ mx: 2, fontWeight: 700, fontSize: '1.5rem' }}>
              {quantity}
            </Typography>
            <Button size="small" sx={{ fontWeight: 700, fontSize: '1.5rem' }} onClick={onDecrement}>-</Button>
          </Box>
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8 }}
            aria-label="delete"
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}



