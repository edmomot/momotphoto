const ThumbnailCreator = require("./ThumbnailCreator");
const AlbumReader = require('./AlbumReader');

const albumRootPath = './public/albums';

const albumController = {
    GetAllAlbums: (request, response) => {
        AlbumReader.ReadAllAlbums(albumRootPath, ThumbnailCreator.allThumbnailSizesRegex())
            .then(x => response.send(x),
            error => response.status(500).send('Error building directory : ' + error));
    }
};


module.exports =  albumController;