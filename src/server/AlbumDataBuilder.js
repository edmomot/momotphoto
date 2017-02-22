let AlbumDataBuilder = {
    init: function(directoryReader, jsonFileReader) {
        this.DirectoryReader = directoryReader;
        this.JsonFileReader = jsonFileReader;
    },
    build: function(directoryTree) {
        let root = {};




    },
    buildNode: function(directoryTreeDirectory, node) {
        if (this.DirectoryReader.isDirectory(directoryTreeDirectory)) {
            node.albums = [];
            directoryTreeDirectory.children.forEach(function(childDirectory) {
                AlbumDataBuilder.buildNode(directoryTreeDirectory, node);
            });


        } else {
            return AlbumDataBuilder.buildFile(child);
        }
    },
    buildFile: function(directoryTreeFile, node, onSuccess) {
        if (directoryTreeFile.extension.toLowerCase() === '.json') {
            buildJson(directoryTreeFile, node, onSuccess);
        } else if (directoryTreeFile.extension.toLowerCase() === '.jpg') {
            if (!node.images) {
                node.images = [];
            }

            AlbumDataBuilder.buildJpg(directoryTreeFile, node.images, onSuccess);
        } else {
           throw 'Error building file, expecting only JSON and JPG files'
            + 'but read file: ' + directoryTreeFile.path;
        }
    },
    buildJson: function(directoryTreeFile, node, onSuccess) {
        this.JsonFileReader.read(directoryTreeFile.path, function(data) {
            node.push({ description: data });
            if (onSuccess) onSuccess(node);
        }, function(error) {
            throw error;
        });
    },
    buildJpg: function(directoryTreeFile, node, onSuccess) {
        node.push({
            name: directoryTreeFile.name,
            path: directoryTreeFile.path
        });
        if (onSuccess) onSuccess(node);
    }
};

module.exports = AlbumDataBuilder;