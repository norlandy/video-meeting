import React from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const Snackbar = ({ open, text, onClose, variant = 'success', autoHide = true }) => {
	return (
		<MuiSnackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			open={open}
			autoHideDuration={autoHide ? 6000 : null}
			onClose={autoHide ? onClose : null}
		>
			<Alert onClose={onClose} severity={variant}>
				{text}
			</Alert>
		</MuiSnackbar>
	);
};

export default Snackbar;
