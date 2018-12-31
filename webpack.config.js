const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Entry point of the app 
    //Polyfill converts js code (like promises or array.from()) to es5 that "implements" promise (since, promises don't exist in es5)
    entry: [
        'babel-polyfill', './src/js/index.js'
    ],

    // Destination of the bundled code in dist folder
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },

    // Source folder required by the Dev Server to run the app
    devServer: {
        contentBase: './dist'
    },

    // Plugin produces the distributable index.html file in dist folder
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html', template: './src/index.html'
        })
    ],

    // Babel configuration
    module: {
        rules: [
            {
                // Look for all files with .js extension
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};