const fs = require('fs');
const path = require('path');
const nodeThumbnail = require('node-thumbnail');
const albumReader = require('../api/AlbumReader');
const thumbnailConfiguration = require('./ThumbnailConfiguration');

function createMissingAlbumThumbnails(albumRootPath) {
    albumReader.ReadAllAlbums(albumRootPath, thumbnailConfiguration.allThumbnailSizesRegex()).then(albums => {
        for (const album of flattenedAlbums(albums)[0]) {
            for (const thumbnailSize of missingThumbnailSizes(album)) {
                createDirectoryIfMissing(albumThumbnailSubFolder(thumbnailSize, album));

                console.log('Creating ' + thumbnailSize + 'px size thumbnails for album ' + album.path);

                nodeThumbnail.thumb({
                    source: fullPath(album.path),
                    destination: albumThumbnailSubFolder(thumbnailSize, album),
                    width: thumbnailSize,
                    ignore: 'true',
                    suffix: ''
                })
            }
        }
    });
}

function flattenedAlbums(album) {
    if (album.albums) {
        if (!album.name)
            return album.albums.flatMap(flattenedAlbums);

        return [
            album,
            ...album.albums.flatMap(flattenedAlbums)
        ];
    }

    return [ album ];
}

function missingThumbnailSizes(album) {
    return thumbnailSizes
        .filter(thumbnailSize => thumbnailSizeMissing(thumbnailSize, album));
}

function thumbnailSizeMissing(thumbnailSize, album) {
    return !fs.existsSync(albumThumbnailSubFolder(thumbnailSize, album));
}

function createDirectoryIfMissing(directory) {
    if (!fs.existsSync(directory)) {
        console.log('Creating missing directory: ' + directory);
        fs.mkdirSync(directory);
    }
}

function fullPath(pathRelativeToFile) {
    return path.resolve(pathRelativeToFile);
}

function albumThumbnailSubFolder(thumbnailSize, album) {
    return path.join(fullPath(album.path), thumbnailConfiguration.thumbnailSubFolder(thumbnailSize))
}

createMissingAlbumThumbnails('./public/albums');