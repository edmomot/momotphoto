const AlbumDataBuilder = require('./AlbumDataBuilder');
const directoryReader = require('./DirectoryReader');
const jsonFileReader = require('./JsonFileReader');
const directoryTree = require('directory-tree');

const albumRootPath = './public/albums';

function ReadAllAlbums() {
    AlbumDataBuilder.init(directoryReader, jsonFileReader);
    let dirTree = directoryTree(albumRootPath);
    return AlbumDataBuilder.build(dirTree).then(x => transformRecursively(x, transformAlbum));
}

function transformRecursively(rootNode, transformNode) {
    if (rootNode.albums) {
        return {
            ...transformNode(rootNode),
            albums: rootNode.albums.map(x => transformRecursively(x, transformNode))
        }
    }

    return transformNode(rootNode);
}

function transformAlbum(album) {
    return {
        name: album.name,
        url: (album.path ? convertPathToUrl(album.path) : undefined),
        images: album.images ? album.images.map(transformImage) : undefined
    }
}

function transformImage(image) {
    return {
        name: image.name,
        url: convertPathToUrl(image.path)
    }
}

function convertPathToUrl(path) {
    return path
        .split('\\')
        .filter(x => x !== '..')
        .filter(x => x !== 'public')
        .map(encodeURI)
        .join('/');
}

module.exports = { ReadAllAlbums };