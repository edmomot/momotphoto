const AlbumDataBuilder = require('./AlbumDataBuilder');
const directoryReader = require('./DirectoryReader');
const jsonFileReader = require('./JsonFileReader');
const directoryTree = require('directory-tree');

function ReadAllAlbums(albumRootPath, excludingFolderNameRegex) {
    AlbumDataBuilder.init(directoryReader, jsonFileReader);
    let dirTree = directoryTree(albumRootPath, { exclude: excludingFolderNameRegex });
    return AlbumDataBuilder.build(dirTree)
        .then(result => transformRecursively({ albums: result.albums[0].albums } , transformAlbum));
}

function transformRecursively(rootNode, transformNode) {
    if (rootNode.albums) {
        if (!rootNode.name)
            return rootNode.albums.map(x => transformRecursively(x, transformNode));

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
        route: (album.path ? convertPathToRoute(album.path) : undefined),
        path: album.path,
        images: album.images ? album.images.map(i => transformImage(album, i)) : undefined
    }
}

function transformImage(album, image) {
    return {
        ...image,
        url: convertPathToUrl(image.path),
        thumbnail: convertPathToUrl(thumbnail(album, image)),
    }
}

function convertPathToUrl(path) {
    return '/' + path
        .split(/\\|\//)
        .filter(x => x !== '..')
        .filter(x => x !== 'public')
        .map(encodeURI)
        .join('/');
}

function convertPathToRoute(path) {
    return '/' + path
        .split(/\\|\//)
        .filter(x => x !== '..')
        .filter(x => x !== 'public')
        .join('/');
}

function thumbnail(album, image) {
    return album.path + '/thumb_200/' + image.name;
}

module.exports = { ReadAllAlbums };