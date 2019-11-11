const fs = require('fs');
const path = require('path');
const nodeThumbnail = require('node-thumbnail');
const albumReader = require('../api/AlbumReader');

const thumbnailSizes = [ 200, 400 ];

function allThumbnailSizesRegex() {
    return new RegExp(thumbnailSizes.map(thumbnailSubFolder).join('|'));
}

function createMissingAlbumThumbnails(albumRootPath) {
    console.log(path.resolve(albumRootPath));

    albumReader.ReadAllAlbums(albumRootPath, allThumbnailSizesRegex()).then(albums => {

        const a = flattenedAlbums(albums);

        console.log('flattened: ' + JSON.stringify(a));

        for (const album of a) {
            console.log('album thumbnails being created for ' + album.name);

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
    console.log('relative: ' + pathRelativeToFile);

    const absolute = path.resolve(pathRelativeToFile);
    console.log('absolute: ' + absolute);

    return absolute;
}

function albumThumbnailSubFolder(thumbnailSize, album) {
    return path.join(fullPath(album.path), thumbnailSubFolder(thumbnailSize))
}

function thumbnailSubFolder(thumbnailSize) {
    return 'thumb_' + thumbnailSize;
}

module.exports = { createMissingAlbumThumbnails, allThumbnailSizesRegex };