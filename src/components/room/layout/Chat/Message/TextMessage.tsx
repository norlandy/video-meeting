import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import moment from 'moment';

import * as types from '@/components/room/types';

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
});

type Props = {
	message: types.TextMessage;
	info?: boolean;
};

const TextMessage: React.FC<Props> = ({message, info = true}) => {
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

			<Card className={classes.message}>
				<Typography variant='body2'>{message.text}</Typography>
			</Card>
		</div>
	);
};

export default TextMessage;
