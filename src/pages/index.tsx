import {useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import VideocamIcon from '@material-ui/icons/Videocam';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import {v4 as uuidv4} from 'uuid';

import {useStyles} from '@/components/home/layout/styles';
import JoinModal from '@/components/home/layout/JoinModal';
import IconButton from '@/components/common/IconButton';
import Snackbar from '@/components/common/Snackbar';

const Home: React.FC = () => {
	const classes = useStyles();

	const router = useRouter();

	const [joinModal, setJoinModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState({show: false, text: ''});

	const handleCreateMeeting = () => {
		router.push(`/${uuidv4()}`);
	};

	const handleJoin = (link: string) => {
		try {
			// if link url - parse it and get meeting id
			const url = new URL(link);

			if (url.host !== window.location.host) {
				return setErrorMessage({show: true, text: 'Not valid meeting id'});
			}

			const paths = url.pathname.split('/');

			if (paths.length > 2) {
				return setErrorMessage({show: true, text: 'Not valid meeting id'});
			}

			const roomId = paths[1];

			router.push(`/${roomId}`);
		} catch (err) {
			// if link not url - is meeting id
			if (err.name === 'TypeError') {
				router.push(`/${link}`);
			}
		}
	};

	return (
		<section className={classes.root}>
			<Head>
				<title>Video meeting</title>
			</Head>

			<IconButton className={classes.button} onClick={handleCreateMeeting}>
				<VideocamIcon className={classes.icon} fontSize='large' />
			</IconButton>

			<IconButton className={classes.button} onClick={() => setJoinModal(true)}>
				<ControlPointIcon className={classes.icon} fontSize='large' />
			</IconButton>

			<JoinModal open={joinModal} onClose={() => setJoinModal(false)} onSubmit={handleJoin} />

			<Snackbar
				open={errorMessage.show}
				text={errorMessage.text}
				variant='error'
				onClose={() => setErrorMessage((prev) => ({...prev, show: false}))}
			/>
		</section>
	);
};

export default Home;
