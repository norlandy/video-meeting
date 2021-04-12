import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100vh',
	},
	button: {
		width: 150,
		height: 150,

		[theme.breakpoints.down('xs')]: {
			width: 100,
			height: 100,
		},

		'&:first-child': {
			marginRight: 60,

			[theme.breakpoints.down('xs')]: {
				marginRight: 20,
			},
		},
	},
	icon: {
		fontSize: 100,

		[theme.breakpoints.down('xs')]: {
			fontSize: 70,
		},
	},
}));
