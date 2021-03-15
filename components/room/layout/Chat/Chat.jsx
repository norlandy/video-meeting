import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import Keyboard from './Keyboard';
import Message from './Message';
import layout from '../layout.json';

const useStyles = makeStyles(theme => ({
	drawer: {
		width: layout.CHAT_WIDTH,
		flexShrink: 0,
		position: 'relative',
	},
	drawerPaper: {
		width: layout.CHAT_WIDTH,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	dndPlaceholder: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 1000,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgb(0, 0, 0, .6)',
		color: 'white',
		borderRadius: 0,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-start',
		width: '100%',
	},
	closeButton: {
		marginRight: 20,
	},
	messages: {
		flex: 1,
		padding: '10px 20px',
		overflow: 'auto',
	},
}));

const Chat = ({
	open,
	messages,
	scrollDown,
	disabled,
	handleAddMessage,
	handleAddFile,
	closeChat,
}) => {
	const classes = useStyles();

	const [dndPlaceholder, setDndPlaceholder] = useState(false);
	const messagesRef = useRef(null);

	useEffect(() => {
		if (scrollDown) {
			messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
		}
	}, [messages, scrollDown]);

	const handleDragEnter = () => {
		setDndPlaceholder(true);
	};
	const handleDragLeave = () => {
		setDndPlaceholder(false);
	};
	const handleDragOver = e => {
		e.preventDefault();
	};
	const handleDrop = e => {
		e.preventDefault();

		setDndPlaceholder(false);

		const file = e.dataTransfer.files[0];

		handleAddFile(file);
	};

	return (
		<Drawer
			className={classes.drawer}
			variant='persistent'
			anchor='right'
			open={open}
			classes={{
				paper: classes.drawerPaper,
			}}
			onDragEnter={handleDragEnter}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			{dndPlaceholder && <div className={classes.dndPlaceholder} onDragLeave={handleDragLeave} />}

			<div>
				<ButtonBase disabled={disabled} className={classes.drawerHeader} onClick={closeChat}>
					<IconButton className={classes.closeButton} disabled component='span'>
						<ChevronRightIcon color='action' />
					</IconButton>

					<Typography variant='h5' color='textSecondary'>
						Chat
					</Typography>
				</ButtonBase>

				<Divider />
			</div>

			<div className={classes.messages} ref={messagesRef}>
				{messages.map((message, index) => {
					const prevMessage = messages[index - 1];

					return (
						<Message
							key={Math.random(0, 1000)}
							message={message}
							info={index === 0 || prevMessage.user !== message.user}
						/>
					);
				})}
			</div>

			<Keyboard disabled={disabled} handleAddMessage={handleAddMessage} />
		</Drawer>
	);
};

export default Chat;
