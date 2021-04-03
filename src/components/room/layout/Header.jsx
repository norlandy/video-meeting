import React from 'react';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinkIcon from '@material-ui/icons/Link';
import ForumIcon from '@material-ui/icons/Forum';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import classNames from 'classnames';

import layout from './layout.json';
import IconButton from '@/components/common/IconButton';

const useStyles = makeStyles(theme => ({
	appBar: {
		boxShadow: 'none',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${layout.CHAT_WIDTH}px)`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginRight: layout.CHAT_WIDTH,
	},
	spacer: {
		flexGrow: 1,
	},
	hide: {
		display: 'none',
	},
}));

const Header = ({ chat, videoDisabled, audioDisabled, handleCopyLink, handleOpenChat }) => {
	const classes = useStyles();

	const router = useRouter();

	return (
		<AppBar
			position='fixed'
			color='transparent'
			className={classNames(classes.appBar, {
				[classes.appBarShift]: chat,
			})}
		>
			<Toolbar>
				<IconButton onClick={() => router.push('/')}>
					<ArrowBackIcon />
				</IconButton>

				<div className={classes.spacer} />

				<IconButton onClick={handleCopyLink} disabled={videoDisabled && audioDisabled}>
					<LinkIcon />
				</IconButton>

				<IconButton onClick={handleOpenChat} className={classNames(chat && classes.hide)}>
					<ForumIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
