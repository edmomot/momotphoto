const AlbumDataBuilder = require('./AlbumDataBuilder');
const directoryReader = require('./DirectoryReader');
const jsonFileReader = require('./JsonFileReader');
const directoryTree = require('directory-tree');

const AlbumReader = require('./AlbumReader');

const albumRootPath = './public/albums';

const albumController = {
    GetAllAlbums: (request, response) => {
        // AlbumDataBuilder.init(directoryReader, jsonFileReader);
        //
        // let dirTree = directoryTree(albumRootPath);
        //
        // AlbumDataBuilder.build(dirTree)
        //     .then(x => response.send(x),
        //     error => response.status(500).send("Error building directory " + albumRootPath + ': ' + error));

        AlbumReader.ReadAllAlbums()
            .then(x => response.send(x),
            error => response.status(500).send('Error building directory : ' + error));
    }
};


module.exports =  albumController;