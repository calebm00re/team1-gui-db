import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserRepository } from '../api/userRepository.js'
import { useNavigate } from "react-router-dom";

export const AlertDelete = ({ open, setOpen }) => {

    const userRepository = new UserRepository();
    const navigate = useNavigate();

    const handleSubmit = () => {
        userRepository.deleteUser().then(res => {
            console.log('this is the response for delete_user: ')
            console.log(res)
            // alert('Your account has been deleted!');
            navigate('/landing');
        }).catch(error => {
            console.log('this is the error for delete_user: ')
            console.log(error)
            // alert('There was an error deleting your account, please try again.');
        });
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" color="error">
                    {"Delete?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" color="error">
                        Are you sure you want to delete your account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="error">Yes</Button>
                    <Button onClick={handleClose} color="error" autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}