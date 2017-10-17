module.exports = {
    entry: {
        main: './src/scripts/main.jsx'
    },
    output: {
        filename: './dist/scripts/[name].js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'react-hmre']
            }
        }, {
            test: /\.jsx$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['babel-loader', 'eslint-loader']
        }, {
            test: /\.less$/,
            loaders: ['style-loader', 'css-loader', 'less-loader']
        }]
    }
}
