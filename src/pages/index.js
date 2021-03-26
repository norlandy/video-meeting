import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import VideocamIcon from '@material-ui/icons/Videocam';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';

import JoinModal from '../components/home/layout/JoinModal';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100vh',
	},
	button: {
		width: 150,
		height: 150,

		'&:first-child': {
			marginRight: 60,
		},
	},
	icon: {
		fontSize: 100,
	},
});

const Home = () => {
	const classes = useStyles();

	const router = useRouter();

	const [joinModal, setJoinModal] = useState(false);

	const handleCreateMeeting = () => {
		router.push(`/${uuidv4()}`);
	};

	const handleJoin = link => {
		try {
			const url = new URL(link);

			if (url.host !== window.location.host) {
				return console.log('not valid meeting id');
			}

			const paths = new URL(link).pathname.split('/');

			if (paths > 2) {
				return console.log('not valid meeting id');
			}

			const roomId = paths[1];

			router.push(`/${roomId}`);
		} catch (err) {
			router.push(`/${link}`);
		}
	};

	return (
		<section className={classes.root}>
			<Head>
				<title>Video meeting</title>
			</Head>

			<IconButton className={classes.button} centerRipple={false} onClick={handleCreateMeeting}>
				<VideocamIcon className={classes.icon} fontSize='large' />
			</IconButton>

			<IconButton
				className={classes.button}
				centerRipple={false}
				onClick={() => setJoinModal(true)}
			>
				<ControlPointIcon className={classes.icon} fontSize='large' />
			</IconButton>

			<JoinModal open={joinModal} closeModal={() => setJoinModal(false)} onSubmit={handleJoin} />
		</section>
	);
};

export default Home;
