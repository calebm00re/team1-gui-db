import { CardContent } from "@mui/material"
import { Button } from "@mui/material"
import { CardActions } from "@mui/material"
import { Typography } from "@mui/material"
import { Card } from "@mui/material"
import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import { UserRepository } from '../api/userRepository.js'

export const SitterCards = ({ date }) => {
    const [sitters, setSitters] = useState([]);

    const getSitter = (i, sitterList) => {
        var sitterTemp = sitters;
        let currentSitter = sitterList[i];
        sitterTemp[i] = currentSitter;
        setSitters(sitterTemp);
    }

    const loadSitters = () => {
        const day = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        // const day = '2022-5-25';
        console.log('day: ' + day);
        userRepository.getSittersByDate(day).then(response => {
            console.log('this is the response for getSittersByDate in dashboard app: ')
            console.log(response)
            let allSitters = response.data;
            for (var i in allSitters) {
                getSitter(i, allSitters);
            }
        })
            .catch(error => {
                console.log('error in dashboard app: ')
                console.log(error)
            })
    }
    useEffect(() => {
        setSitters([]);
        console.log('in sitter cards use effect');
        loadSitters();
        console.log('sitters: ');
        console.log(sitters);
    }, [date]);

    const userRepository = new UserRepository();
    // sitters.length === 0 ?
    // return (<Typography>No sitters available</Typography>); 
    // :
    return (
        <Container sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
            {sitters.map((sitter, index) =>
                <div key={index}>
                    <Card sx={{ minWidth: 275, m: 2 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {sitter.start_time.substring(11, 16)} - {sitter.end_time.substring(11, 16)} / {sitter.start_time.substring(0, 10)}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {/* be{bull}nev{bull}o{bull}lent */}
                                {sitter.firstname} {sitter.lastname}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {sitter.location}
                            </Typography>
                            <Typography variant="body2">
                                  ${sitter.price} / hour
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                            <Button size="small">Book</Button>
                        </CardActions>
                    </Card>
                </div>
            )}
        </Container>
    )
}