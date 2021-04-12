import {createMuiTheme} from '@material-ui/core/styles';
import {blue} from '@material-ui/core/colors';

// xs - 600px
// sm - 960px
// md - 1280px

export const defaultTheme = createMuiTheme({
	palette: {
		primary: {
			main: blue[500],
		},
	},
});
