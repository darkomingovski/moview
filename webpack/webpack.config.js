const path = require("path");
const loaders = require('./loaders');
const plugins = require('./plugins');

module.exports = {
    entry: "./src/js/main.js",
    mode: 'development',
    module: {
        rules: [
            loaders.CSSLoader,
            loaders.JSLoader,
            loaders.ESLintLoader
        ]
    },
    plugins: [
        plugins.MiniCssExtractPlugin,
    ],
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].bundle.js"
    },
};