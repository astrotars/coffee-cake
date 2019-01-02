const slsw = require('serverless-webpack');
const externals = require('webpack-node-externals');

module.exports = {
	entry: slsw.lib.entries,
	mode: 'none',
	target: 'node',
	externals: [externals()]
};
