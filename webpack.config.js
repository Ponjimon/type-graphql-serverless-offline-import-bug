const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

module.exports = {
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    optimization: {
        minimize: false,
    },
    devtool: 'source-map',
    target: 'node',
    externals: [nodeExternals()],
    entry: slsw.lib.entries,
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    happyPackMode: true,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
    },
};
