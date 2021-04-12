import {useEffect} from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'webrtc-adapter';

import {defaultTheme} from '@/utils/theme';

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');

		jssStyles?.parentElement?.removeChild(jssStyles);
	}, []);

	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />

			<Head>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
				/>
			</Head>

			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default MyApp;
