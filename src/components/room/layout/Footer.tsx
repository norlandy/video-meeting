import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';

import IconButton from '@/components/common/IconButton';
import Context from '@/components/room/context';

const useStyles = makeStyles((theme) => ({
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

		[theme.breakpoints.down('xs')]: {
			width: 80,
			height: 80,
		},
	},
	icon: {
		fontSize: 55,

		[theme.breakpoints.down('xs')]: {
			fontSize: 45,
		},
	},
}));

type Props = {
	toggleVideo: () => void;
	toggleAudio: () => void;
};

const Footer: React.FC<Props> = ({toggleVideo, toggleAudio}) => {
	const classes = useStyles();

	const {videoInput, audioInput, videoDisabled, audioDisabled} = useContext(Context);

	return (
		<div className={classes.footer}>
			<IconButton
				className={classes.button}
				color={videoInput ? 'default' : 'secondary'}
				onClick={toggleVideo}
				disabled={videoDisabled}
			>
				{videoInput ? (
					<VideocamIcon className={classes.icon} />
				) : (
					<VideocamOffIcon className={classes.icon} />
				)}
			</IconButton>
			<IconButton
				className={classes.button}
				color={audioInput ? 'default' : 'secondary'}
				onClick={toggleAudio}
				disabled={audioDisabled}
			>
				{audioInput ? (
					<MicIcon className={classes.icon} />
				) : (
					<MicOffIcon className={classes.icon} />
				)}
			</IconButton>
		</div>
	);
};

export default Footer;
