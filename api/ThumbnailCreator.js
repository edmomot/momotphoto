const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const albumReader = require('../api/AlbumReader');
const thumbnailConfiguration = require('./ThumbnailConfiguration');

function createMissingAlbumThumbnails(albumRootPath) {
    albumReader.ReadAllAlbums(albumRootPath, thumbnailConfiguration.allThumbnailSizesRegex()).then(albums => {
        for (const album of flattenedAlbums(albums)[0]) {
            fs.readdir(album.path, (error, albumPathFiles) => {
                for (const thumbnailSize of missingThumbnailSizes(album, albumPathFiles)) {
                    console.log('Creating ' + thumbnailSize + 'px size thumbnails for album ' + album.path);

                    createDirectory(albumThumbnailSubFolder(thumbnailSize, album));

                    for (const partialImagePath of partialImagePaths(albumPathFiles)) {
                        createThumbnail(album, partialImagePath, thumbnailSize);
                    }
                }
            });
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

function createThumbnail(album, partialImagePath, thumbnailSize) {
    sharp(fullImagePath(album, partialImagePath))
        .resize({width: thumbnailSize})
        .jpeg({
            quality: 60
        })
        .sharpen(1, 0, 1)
        .toFile(imageThumbnailDestination(album, thumbnailSize, partialImagePath))
        .catch(imageError => console.log("Error creating thumbnail: " + JSON.stringify(imageError)));
}

function partialImagePaths(albumPathFiles) {
    return albumPathFiles.filter(path => path.endsWith('.jpg'));
}

function fullImagePath(album, partialImagePath) {
    return path.join(album.path, partialImagePath);
}

function imageThumbnailDestination(album, thumbnailSize, imagePath) {
    return path.join(albumThumbnailSubFolder(thumbnailSize, album), imagePath);
}

function missingThumbnailSizes(album, albumPathFiles) {
    return thumbnailConfiguration.thumbnailSizes
        .filter(thumbnailSize => thumbnailSizeMissing(thumbnailSize, albumPathFiles));
}

function thumbnailSizeMissing(thumbnailSize, albumPathFiles) {
    return !albumPathFiles.includes(thumbnailConfiguration.thumbnailSubFolder(thumbnailSize));
}

function createDirectory(directory) {
    fs.mkdirSync(directory);
}

function fullPath(pathRelativeToFile) {
    return path.resolve(pathRelativeToFile);
}

function albumThumbnailSubFolder(thumbnailSize, album) {
    return path.join(fullPath(album.path), thumbnailConfiguration.thumbnailSubFolder(thumbnailSize))
}

createMissingAlbumThumbnails('./public/albums');