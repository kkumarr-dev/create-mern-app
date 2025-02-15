process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.ASSET_PATH = '/';

const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('../webpack.config')
const env = require('./env')
const path = require('path')

var options = config.chromeExtensionBoilerplate || {};
var excludeEntriesToHotReload = options.notHotReload || [];

for (var entryName in config.entry) {
  	if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    	config.entry[entryName] = [
      		'webpack/hot/dev-server',
      		`webpack-dev-server/client?hot=true&hostname=localhost&port=${env.PORT}`,
    	].concat(config.entry[entryName]);
  	}
}

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(
  	config.plugins || []
);

delete config.chromeExtensionBoilerplate;

const compiler = webpack(config);

const server = new WebpackDevServer(
  	{
		https: false,
		hot: false,
		client: false,
		host: 'localhost',
		port: process.env.PORT,
		static: {
			directory: path.join(__dirname, '../build'),
		},
		devMiddleware: {
			publicPath: `http://localhost:${env.PORT}/`,
			writeToDisk: true,
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		allowedHosts: 'all',
  	},
  	compiler
)

if (process.env.NODE_ENV === 'development' && module.hot) {
  	module.hot.accept();
}

(async () => {
  	await server.start();
})()
