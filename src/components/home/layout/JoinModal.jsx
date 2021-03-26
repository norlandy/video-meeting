import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const JoinModal = ({ open, closeModal, onSubmit }) => {
	const [link, setLink] = useState('');

	const handleChangeLink = e => {
		setLink(e.target.value);
	};

	const handleSubmit = () => {
		if (link.length) {
			onSubmit(link);
		}
	};

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			handleSubmit();
		}
	};

	return (
		<Dialog open={open} onClose={closeModal} maxWidth='xs' fullWidth>
			<DialogTitle>Join to meeting</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					value={link}
					onChange={handleChangeLink}
					onKeyDown={handleKeyDown}
					margin='dense'
					placeholder='Enter link or room id'
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeModal} color='primary'>
					Cancel
				</Button>
				<Button onClick={handleSubmit} color='primary'>
					Join
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default JoinModal;
