import React, {useState, useEffect, useRef, useContext} from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Keyboard from './Keyboard';
import Message from './Message';
import layout from '../layout.json';
import IconButton from '@/components/common/IconButton';
import Context from '@/components/room/context';

const useStyles = makeStyles((theme) => ({
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

type Props = {
	handleAddMessage: (text: string) => void;
	handleAddFile: (file: File) => void;
	closeChat: () => void;
};

const Chat: React.FC<Props> = ({handleAddMessage, handleAddFile, closeChat}) => {
	const classes = useStyles();
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	const {chat, messages, scrollDown, videoDisabled, audioDisabled} = useContext(Context);

	const [dndPlaceholder, setDndPlaceholder] = useState(false);
	const messagesRef = useRef<HTMLDivElement>(null!);

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
	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};
	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();

		setDndPlaceholder(false);

		const file = e.dataTransfer.files[0];

		handleAddFile(file);
	};

	return (
		<Drawer
			className={classes.drawer}
			variant={matches ? 'temporary' : 'persistent'}
			anchor='right'
			open={chat}
			classes={{
				paper: classes.drawerPaper,
			}}
			onDragEnter={handleDragEnter}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onClose={closeChat}
		>
			{dndPlaceholder && <div className={classes.dndPlaceholder} onDragLeave={handleDragLeave} />}

			<div>
				<ButtonBase
					disabled={videoDisabled && audioDisabled}
					className={classes.drawerHeader}
					onClick={closeChat}
				>
					<IconButton className={classes.closeButton} component='span' disabled>
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
							key={Math.random() * 1000}
							message={message}
							info={index === 0 || prevMessage.user !== message.user}
						/>
					);
				})}
			</div>

			<Keyboard disabled={videoDisabled && audioDisabled} handleAddMessage={handleAddMessage} />
		</Drawer>
	);
};

export default Chat;
