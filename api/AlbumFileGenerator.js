const fs = require('fs');
const ThumbnailConfiguration = require("./ThumbnailConfiguration");
const AlbumReader = require('./AlbumReader');

const albumRootPath = './public/albums';
const albumOutputPath = './albums.json';
const routeOutputPath = './albumRoutes.json';

function generateRoutes() {
    AlbumReader.ReadAllAlbums(albumRootPath, ThumbnailConfiguration.allThumbnailSizesRegex())
        .then(allAlbums => {
                fs.writeFileSync(albumOutputPath, JSON.stringify({ albums: allAlbums }));
            },
            error => fs.writeFileSync(routeOutputPath, 'Error reading albums into json : ' + error));
}

generateRoutes();