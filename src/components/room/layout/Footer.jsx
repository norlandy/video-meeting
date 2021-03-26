import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';

const useStyles = makeStyles({
	footer: {
		position: 'absolute',
		bottom: 0,
		left: '50%',
		transform: 'translateX(-50%)',
		padding: 20,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		width: 100,
		height: 100,

		'&:first-child': {
			marginRight: 20,
		},
	},
	icon: {
		fontSize: 55,
	},
});

const Footer = ({ video, audio, videoDisabled, audioDisabled, toggleVideo, toggleAudio }) => {
	const classes = useStyles();

	return (
		<div className={classes.footer}>
			<IconButton
				className={classes.button}
				color={video ? 'default' : 'secondary'}
				onClick={toggleVideo}
				centerRipple={false}
				disabled={videoDisabled}
			>
				{video ? (
					<VideocamIcon className={classes.icon} />
				) : (
					<VideocamOffIcon className={classes.icon} />
				)}
			</IconButton>
			<IconButton
				className={classes.button}
				color={audio ? 'default' : 'secondary'}
				onClick={toggleAudio}
				centerRipple={false}
				disabled={audioDisabled}
			>
				{audio ? <MicIcon className={classes.icon} /> : <MicOffIcon className={classes.icon} />}
			</IconButton>
		</div>
	);
};

export default Footer;
