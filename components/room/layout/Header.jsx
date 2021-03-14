import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinkIcon from '@material-ui/icons/Link';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import IconButton from '@material-ui/core/IconButton';
import ForumIcon from '@material-ui/icons/Forum';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import layout from './layout.json';

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

	title: {
		flexGrow: 1,
	},
	hide: {
		display: 'none',
	},
}));

const Header = ({ chat, handleCopyLink, handleChangeTheme, handleChatOpen }) => {
	const classes = useStyles();

	return (
		<AppBar
			position='fixed'
			color='transparent'
			className={classNames(classes.appBar, {
				[classes.appBarShift]: chat,
			})}
		>
			<Toolbar>
				<div className={classes.title} />

				<IconButton onClick={handleCopyLink} centerRipple={false}>
					<LinkIcon />
				</IconButton>
				<IconButton onClick={handleChangeTheme} centerRipple={false}>
					<Brightness4Icon />
				</IconButton>

				<IconButton
					onClick={handleChatOpen}
					className={classNames(chat && classes.hide)}
					centerRipple={false}
				>
					<ForumIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
