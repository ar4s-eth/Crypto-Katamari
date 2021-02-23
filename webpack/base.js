const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	devtool: "eval-source-map",
	entry: "./src/index.js", //do we need this?
	output: {
		path: path.resolve("dist"),
		filename: "index_bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.(css|ttf)$/,
				use: [{ loader: "style-loader" }, { loader: "css-loader" }],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			{
				test: [/\.vert$/, /\.frag$/],
				use: "raw-loader",
			},
			{
				test: /\.(gif|png|jpe?g|svg|xml)$/i,
				use: "file-loader",
			},
			// { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$/, loader: "file" },
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			CANVAS_RENDERER: JSON.stringify(true),
			WEBGL_RENDERER: JSON.stringify(true),
		}),
		new HtmlWebpackPlugin({
			template: "./index.html",
			filename: "index.html",
			inject: "body",
		}),
	],
};
