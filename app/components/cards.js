

import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CustomCard({ title, description, completed, onCheckboxChange, onDelete }) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%', // Ensures the card takes full width
        padding: 1,
        border: '1px solid',
        borderRadius: 1,
        marginBottom: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#f5f5f5', // Subtle background color change on hover
        },
      }}
    >
      <Checkbox
        checked={completed}
        onChange={onCheckboxChange}
        inputProps={{ 'aria-label': 'Mark as completed' }}
        sx={{ padding: 1, marginLeft: 1 }}
      />
      <CardContent sx={{ flex: 1, padding: '8px 16px', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginLeft: 'auto' }}> {/* Align actions to the right */}
        <IconButton aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
