import React from 'react';
import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = ({image, isAdmin, eventName, location, startDateTime, endDateTime, restaurantName, handleDelete}) => {
    return (
        <div>
            <Card sx={{width:345}}>
                <CardMedia
                    sx={{height:345}}
                    image={image}>
                </CardMedia>
                <CardContent>
                    <Typography style={{marginBottom:"5px"}} variant={'h5'}>
                        {restaurantName}
                    </Typography>
                    <Typography style={{fontWeight:"600"}}  variant={'body2'} >
                        {eventName}
                    </Typography>
                    <div className={'py-2 space-y-2'}>
                        <p>{location}</p>
                        <p className={'text-sm text-blue-500'}>{startDateTime}</p>
                        <p className={'text-sm text-red-500'}>{endDateTime}</p>

                    </div>
                </CardContent>
                {isAdmin && <CardActions>
                    <IconButton className={'cursor-pointer'} onClick={handleDelete}>
                        <DeleteIcon sx={{color:"red"}}/>
                    </IconButton>
                </CardActions>}
            </Card>
        </div>
    );
};

export default EventCard;