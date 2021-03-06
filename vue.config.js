const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');

module.exports = {
    "devServer": {},
    "transpileDependencies": [
        "vuetify"
    ],
    configureWebpack: {
        // Merged into the final Webpack config
        plugins: [
            new PurgecssPlugin({
                paths: glob.sync([
                    path.join(__dirname, './public/index.html'),
                    path.join(__dirname, './**/*.vue'),
                    path.join(__dirname, './src/**/*.js'),
                    path.join(__dirname, './node_modules/vuetify/src/**/*.ts'),
                ])
            })
        ]
    }
};