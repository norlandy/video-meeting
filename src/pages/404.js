import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		minHeight: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 300,
	},
});

const NotFound = () => {
	const classes = useStyles();

	return (
		<section className={classes.root}>
			<Typography variant='h1' className={classes.title}>
				404
			</Typography>
		</section>
	);
};

export default NotFound;