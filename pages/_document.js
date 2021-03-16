import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		// Render app and page and get the context of the page with collected side effects.
		const sheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: App => props => sheets.collect(<App {...props} />),
			});

		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			// Styles fragment is rendered after the app and page rendering finish.
			styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
		};
	}

	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta name='application-name' content='Video meeting' />
					<meta name='apple-mobile-web-app-capable' content='yes' />
					<meta name='apple-mobile-web-app-status-bar-style' content='default' />
					<meta name='apple-mobile-web-app-title' content='PWA App' />
					<meta name='description' content='Video meeting application' />
					<meta name='format-detection' content='telephone=no' />
					<meta name='mobile-web-app-capable' content='yes' />
					<meta name='msapplication-config' content='/static/icons/browserconfig.xml' />
					<meta name='msapplication-TileColor' content='#2B5797' />
					<meta name='msapplication-tap-highlight' content='no' />
					<meta name='theme-color' content='#000000' />

					<link rel='apple-touch-icon' sizes='180x180' href='/static/icons/apple-touch-icon.png' />
					<link rel='icon' type='image/png' sizes='32x32' href='/static/icons/favicon-32x32.png' />
					<link rel='icon' type='image/png' sizes='16x16' href='/static/icons/favicon-16x16.png' />
					<link rel='manifest' href='/static/manifest.json' />
					<link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#5bbad5' />
					<link rel='shortcut icon' href='/static/icons/favicon.ico' />

					{/* google fonts */}
					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
					/>
					<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />

					<meta property='og:type' content='website' />
					<meta property='og:title' content='Video meeting' />
					<meta property='og:description' content='Video meeting application' />
					<meta property='og:site_name' content='Video meeting' />
					<meta property='og:url' content='video-meeting-norlandy.vercel.app' />
					<meta property='og:image' content='/static/icons/apple-touch-icon.png' />
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
