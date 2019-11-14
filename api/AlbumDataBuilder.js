let Promise = require('promise');
const imageDetailReader = require('./ImageDetailReader');
const exifMap = require('./ExifMap');

let AlbumDataBuilder = {
    init: function(directoryReader, jsonFileReader) {
        AlbumDataBuilder.DirectoryReader = directoryReader;
        AlbumDataBuilder.JsonFileReader = jsonFileReader;
    },

    build: function(directoryTree) {
        let root = {};
        return new Promise(function(resolve, reject) {
            AlbumDataBuilder.buildNode(directoryTree, root, root, resolve, reject);
        });
    },

    buildNode: function(directoryTreeDirectory, root, node, resolve, reject) {
        if (AlbumDataBuilder.DirectoryReader.isDirectory(directoryTreeDirectory)) {
            if (node.albums === undefined) node.albums = [];
            let newAlbumNode = {
                name: directoryTreeDirectory.name,
                path: directoryTreeDirectory.path
            };
            node.albums.push(newAlbumNode);

            let childrenBuilt = Promise.all(directoryTreeDirectory.children.map(function (childDirectory) {
                return new Promise(function(res, rej) {
                    AlbumDataBuilder.buildNode(childDirectory, root, newAlbumNode, res, rej);
                });
            }));

            childrenBuilt.then(function () {
                resolve(root);
            });
        } else {
            AlbumDataBuilder.buildFile(directoryTreeDirectory, node, resolve, reject);
        }
    },

    buildFile: function(directoryTreeFile, node, resolve, reject) {
        if (directoryTreeFile.extension.toLowerCase() === '.json') {
            AlbumDataBuilder.buildJson(directoryTreeFile, node, resolve, reject);
        } else if (directoryTreeFile.extension.toLowerCase() === '.jpg') {
            AlbumDataBuilder.buildJpg(directoryTreeFile, node, resolve, reject);
        } else {
           throw `Unexpected file extension. Expecting only JSON and JPG files, but read file: ${directoryTreeFile.path}`;
        }
    },

    buildJson: function(directoryTreeFile, node, resolve, reject) {
        AlbumDataBuilder.JsonFileReader.read(directoryTreeFile.path, function(data) {
            node.description = data;
            if (resolve) resolve(node);
        }, function(error) {
            reject(error);
        });
    },

    buildJpg: function(directoryTreeFile, node, resolve, reject) {
        if (!node.images) node.images = [];

        imageDetailReader.read(directoryTreeFile.path, imageDetails => {
            node.images.push({
                name: directoryTreeFile.name,
                path: directoryTreeFile.path,
                ...imageDetails
            });

            if (resolve) resolve(node);
        });
    }
};

module.exports = AlbumDataBuilder;