const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const ASSET_PATH = process.env.ASSET_PATH ? process.env.ASSET_PATH + '/' : '/';

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src/index.ts'),
	output: {
		filename: '[hash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: ASSET_PATH,
	},
	devtool: "inline-source-map",
	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},
	module: {
		rules: [{
				test: /\.ts?$/,
				use: [{
					loader: 'ts-loader',
					options: {
						configFile: path.resolve(__dirname, 'tsconfig.json')
					},
				}, ],
				exclude: /(node_modules)/
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.(woff|woff2|ttf|otf|eot)?$/i,
				use: [{
					loader: "file-loader",
					options: {
						name: "fonts/[name].[ext]",
					},
				}, ],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [{
					loader: "file-loader",
					options: {
						name: "images/[name].[ext]",
						esModule: false,
					},
				}, ],
			},
		]
	},
	stats: {
		children: true,
		errorDetails: true,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "style.[contenthash].css"
		}),
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets: false
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'static/index.html'),
			scriptLoading: 'defer',
			meta: {
				mobile: true,
				'X-UA-Compatible': 'edge',
				robots: 'noindex',
				charset: 'utf-8',
			},
		}),
		isDevelopment && new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	].filter(Boolean),
	devServer: {
		port: 3000,
		open: false,
		historyApiFallback: true,
		hot: isDevelopment,
		static: {
			directory: path.join(__dirname, 'static'),
		},
	},
};