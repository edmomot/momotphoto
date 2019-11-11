const bodyParser = require('body-parser');
const albumController = require('./AlbumController');

function configureApiRoutes(app) {
    app.use(bodyParser.json());
    app.get('/api', (request, response) => response.send("API"));
    app.get('/api/album', albumController.GetAllAlbums)
}

module.exports = { configureApiRoutes };