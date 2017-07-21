const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
})
const combineLoaders = require('webpack-combine-loaders');

module.exports = {

    entry: './client/main.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query:{ presets: ['es2015', 'react','react-hmre']} },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, query:{ presets: ['es2015', 'react','react-hmre']} },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.(jpg|png|svg)$/, loader: 'url-loader' },
            { test: /\.html$/, loader: 'html-loader' }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    plugins: [
        HtmlWebpackPluginConfig,
    ],
    node: {
        fs:'empty'
    }
}