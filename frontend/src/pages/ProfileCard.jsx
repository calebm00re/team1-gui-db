import React from 'react';
import { Card,
         CardMedia, 
         CardContent, 
         CardActions, 
         Button, 
         Typography,
         ThemeProvider } from '@mui/material';
import theme from '../Assets/theme';
import emma from '../Assets/images/emma.jpeg';

export const ProfileCard = (name) => {
    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ maxWidth: 345,
                        m: 1
                    }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={emma}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Emma W.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Excellent with age ranges 3-8, can cook, cleans up after the kids go to bed.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant='contained' color='secondary'>Profile</Button>
                    <Button size="small" variant='contained' color='info'>Calendar</Button>
                </CardActions>
            </Card>
        </ThemeProvider>
    );
}