
const webpack = require("webpack");
const path = require("path");

module.exports = {
    mode: 'production',
    entry: './src/out/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'le_react_components.min.js',
        library: 'le_react_components',
        libraryTarget: 'umd'
    },
    devtool: 'none'
}