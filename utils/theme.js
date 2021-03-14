import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

export const defaultTheme = createMuiTheme({
	palette: {
		primary: {
			main: blue[500],
		},
	},
});
