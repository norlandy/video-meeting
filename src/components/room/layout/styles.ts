import {makeStyles} from '@material-ui/core/styles';

import layout from '@/components/room/layout/layout.json';

export const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100vh',
		display: 'flex',
	},
	mainBlock: {
		flexGrow: 1,
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: -layout.CHAT_WIDTH,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),

		[theme.breakpoints.down('md')]: {
			marginRight: 0,
		},
	},
	mainBlockShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginRight: 0,
	},
	videos: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		maxWidth: 1000,

		'& video': {
			width: 400,
			height: 300,
			maxWidth: '100%',
			objectFit: 'cover',
			backgroundColor: 'black',

			'&:first-child': {
				display: 'block',
			},

			[theme.breakpoints.down('sm')]: {
				display: 'none',
			},
		},
	},
}));
