const AlbumDataBuilder = require('./AlbumDataBuilder');
const directoryReader = require('./DirectoryReader');
const jsonFileReader = require('./JsonFileReader');
const directoryTree = require('directory-tree');

function ReadAllAlbums(albumRootPath, excludingFolderNameRegex) {
    AlbumDataBuilder.init(directoryReader, jsonFileReader);

    console.log(excludingFolderNameRegex);

    let dirTree = directoryTree(albumRootPath, { exclude: excludingFolderNameRegex }, );

    return AlbumDataBuilder.build(dirTree)
        .then(result => transformRecursively({ albums: result.albums[0].albums } , transformAlbum));
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
        path: album.path,
        images: album.images ? album.images.map(transformImage) : undefined
    }
}

function transformImage(image) {
    return {
        name: image.name,
        url: convertPathToUrl(image.path),
        path: image.path
    }
}

function convertPathToUrl(path) {
    return '/' + path
        .split('\\')
        .filter(x => x !== '..')
        .filter(x => x !== 'public')
        .map(encodeURI)
        .join('/');
}

module.exports = { ReadAllAlbums };