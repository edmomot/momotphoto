const bodyParser = require('body-parser');
const albumController = require('./AlbumController');

module.exports = app => {
    console.log("configuring api routes");
    app.use(bodyParser.json());
    app.get('/api', (request, response) => response.send("API"));
    app.get('/api/album', albumController.GetAllAlbums)
};