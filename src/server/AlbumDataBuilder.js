let DirectoryReader = require('./directory-reader');

let AlbumDataBuilder = {
    build: function(directoryTree) {
        return directoryTree.children.map(function(child) {
            if (DirectoryReader.isDirectory(child)) {
                return AlbumDataBuilder.buildDirectory(child);
            } else {
                return AlbumDataBuilder.buildFile(child);
            }
        });
    },
    buildDirectory: function(directoryTreeDirectory) {

    },
    buildFile: function(directoryTreeFile) {
        if (directoryTreeFile.extension.toLowerCase() === '.json')
            return AlbumDataBuilder.buildJson(directoryTreeFile);

        if (directoryTreeFile.extension.toLowerCase() === '.jpg')
            return AlbumDataBuilder.buildJpg(directoryTreeFile);

        throw 'Error building file, expecting only JSON and JPG files'
            + 'but read file ' + directoryTreeFile.path;
    },
    buildJson: function(directoryTreeFile) {

    },
    buildJpg: function(directoryTreeFile) {
        return {
            name: directoryTreeFile.name,
            path: directoryTreeFile.path
        };
    }
};

module.exports = AlbumDataBuilder;