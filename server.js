const express = require('express');
const path = require('path');

const config = require('./webpack.config');
const webpack = require('webpack');
const historyApiFallback = require('connect-history-api-fallback');

const app = express();
const compiler = webpack(config);

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.use(
	historyApiFallback({
		verbose: false,
	}),
);

app.use(
	require('webpack-dev-middleware')(compiler, {
		publicPath: config.output.publicPath,
	}),
);

app.use(
	require('webpack-hot-middleware')(compiler, {
		path: `/__webpack_hmr`,
		heartbeat: 3 * 1000,
	}),
);

app.get('/', (_, res) =>
	res.sendFile(__dirname + '/static/index.html'),
);

app.listen(PORT, () => {
	console.log(`dev server started on port ${PORT}!`);
});