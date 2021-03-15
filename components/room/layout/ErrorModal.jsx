import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ErrorModal = ({ open, closeModal }) => {
	return (
		<Dialog open={open} onClose={closeModal}>
			<DialogTitle id='alert-dialog-title'>Requested device not found</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Failed to connect required device. Make sure your camera or microphone is connected
					correctly.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeModal} color='primary' autoFocus>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ErrorModal;
