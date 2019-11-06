const configureApiRoutes = require('../api/configureApiRoutes');

module.exports = {
    devServer: {
        before: configureApiRoutes
    }
};