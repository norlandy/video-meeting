import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
	root: {},
	keyboard: {
		padding: '10px 14px',
	},
	input: {},
});

const Keyboard = ({ disabled, handleAddMessage }) => {
	const classes = useStyles();

	const [text, setText] = useState('');

	const handleTextChange = e => {
		setText(e.target.value);
	};

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			e.preventDefault();

			if (text.length) {
				handleAddMessage(text);
				setText('');
			}
		}
	};

	return (
		<Paper className={classes.root}>
			<Divider />

			<div className={classes.keyboard}>
				<InputBase
					className={classes.input}
					placeholder='Type something...'
					value={text}
					onChange={handleTextChange}
					onKeyDown={handleKeyDown}
					disabled={disabled}
					rowsMax={6}
					autoFocus
					fullWidth
					multiline
				/>
			</div>
		</Paper>
	);
};

export default Keyboard;
