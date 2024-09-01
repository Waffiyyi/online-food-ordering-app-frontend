import React from 'react';
import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = () => {
    return (
        <div>
            <Card sx={{width:345}}>
                <CardMedia
                    sx={{height:345}}
                    image={'https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&w=800'}>
                </CardMedia>
                <CardContent>
                    <Typography variant={'h5'}>
                        Indian Fast Food
                    </Typography>
                    <Typography variant={'body2'}>
                        We cooking!
                      50% off your first order tommorrow at Itamaga, pull in!!
                    </Typography>
                    <div className={'py-2 space-y-2'}>
                        <p>Itamaga</p>
                        <p className={'text-sm text-blue-500'}>Novembar 14, 2024 12:00PM</p>
                        <p className={'text-sm text-red-500'}>Novembar 15, 2024 12:00PM</p>

                    </div>
                </CardContent>
                {false && <CardActions>
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </CardActions>}
            </Card>
        </div>
    );
};

export default EventCard;