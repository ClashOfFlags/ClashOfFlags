require('dotenv').config();

var elixir = require('laravel-elixir');
var webpackConfig = require('./webpack.config');
elixir.config.assetsPath = 'public/sources';
elixir.config.publicPath = 'public/distribution';

require('laravel-elixir-webpack');

elixir(function(mix) {
    mix.sass('app.scss');
    mix.webpack('app.js', webpackConfig);
    mix.browserSync({
        proxy: 'localhost:' + process.env.PORT,
        ui: false,
        ghostMode: false,
        ws: true
    });
});