const apiRouteConfiguration = require('../api/ApiRouteConfiguration');
const thumbnailCreator = require('../api/ThumbnailCreator');

module.exports = {
    devServer: {
        before: app => {
            thumbnailCreator.createMissingAlbumThumbnails('./public/albums');
            apiRouteConfiguration.configureApiRoutes(app);
        }
    }
};