import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import moment from 'moment';
import ButtonBase from '@material-ui/core/ButtonBase';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import classNames from 'classnames';

const useStyles = makeStyles({
	root: {
		wordWrap: 'break-word',
		margin: '5px 0',

		'&:first-child': {
			marginTop: 0,
		},

		'&:last-child': {
			marginBottom: 0,
		},
	},
	info: {
		marginBottom: 5,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	user: {
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		width: 200,
	},
	message: {
		padding: 10,
		backgroundColor: blue[100],
		borderRadius: 10,
		boxShadow: 'none !important',
		width: '100%',
	},
	file: {
		backgroundColor: 'transparent',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		border: `1px solid ${blue[100]}`,
	},
	fileIcon: {
		marginRight: 10,
	},
	fileInfo: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
});

const Message = ({ message, info = true }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{info && (
				<div className={classes.info}>
					<Typography variant='caption' className={classes.user}>
						from:{' '}
						<Typography variant='body2' component='span'>
							{message.user}
						</Typography>
					</Typography>

					<Typography variant='caption'>{moment(message.date).format('LT')}</Typography>
				</div>
			)}

			{message.type === 'text' && (
				<Card className={classes.message}>
					<Typography variant='body2'>{message.text}</Typography>
				</Card>
			)}

			{message.type === 'file' && (
				<ButtonBase className={classNames(classes.message, classes.file)}>
					<InsertDriveFileIcon fontSize='large' className={classes.fileIcon} color='action' />

					<div className={classes.fileInfo}>
						<Typography variant='body2'>{message.filename}</Typography>
						<Typography variant='caption' color='textSecondary'>
							22MB
						</Typography>
					</div>
				</ButtonBase>
			)}
		</div>
	);
};

export default Message;
