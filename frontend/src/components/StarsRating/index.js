import React from 'react';
import { Rating } from '@mui/material';

function StarsRating() {
    return (
        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
    );
}

export default StarsRating;