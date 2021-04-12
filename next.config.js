const withPWA = require('next-pwa');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withPWA({
	pwa: {
		dest: 'public',
	},
	webpack(config, options) {
		const {dev, isServer} = options;

		// Do not run type checking twice:
		if (dev && isServer) {
			config.plugins.push(new ForkTsCheckerWebpackPlugin());
		}

		return config;
	},
});
