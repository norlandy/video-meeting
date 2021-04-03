import MuiIconButton from '@material-ui/core/IconButton';

const IconButton = ({ children, ...props }) => (
	<MuiIconButton {...props} centerRipple={false}>
		{children}
	</MuiIconButton>
);

export default IconButton;
