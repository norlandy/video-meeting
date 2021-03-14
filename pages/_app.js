import { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import '../styles/globals.scss';
import { defaultTheme } from '../utils/theme';

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');

		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />

			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
