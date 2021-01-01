const path = require('path');

module.exports = {
    // entry files
    entry: ['@babel/polyfill', './src/js/main.js', './src/sass/main.scss'],
    // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src/js')
                ],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader",   // translates CSS into CommonJS
                    "sass-loader"   // compiles Sass to CSS, using Node Sass by default
                ],
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map',
    // https://webpack.js.org/concepts/mode/#mode-development
    mode: 'development'
};