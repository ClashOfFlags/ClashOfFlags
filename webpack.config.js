module.exports = {
    entry: './app/client/app.js',
    output: {
        path: __dirname + '/public/distribution/javascript',
        filename: 'app-vue.js'
    },
    externals: {
        vue: 'Vue'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    devtool: 'source-map'
};