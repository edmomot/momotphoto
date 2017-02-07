let AlbumDataBuilder = {
    init: function(directoryReader, jsonFileReader) {
        this.DirectoryReader = directoryReader;
        this.JsonFileReader = jsonFileReader;
    },
    build: function(directoryTree) {
        let root = {};




    },
    buildDirectory: function(directoryTreeDirectory, node) {
        if (this.DirectoryReader.isDirectory(directoryTreeDirectory)) {

            AlbumDataBuilder.buildDirectory(directoryTreeDirectory);
        } else {
            return AlbumDataBuilder.buildFile(child);
        }
    },
    buildFile: function(directoryTreeFile) {
        if (directoryTreeFile.extension.toLowerCase() === '.json')
            return AlbumDataBuilder.buildJson(directoryTreeFile);

        if (directoryTreeFile.extension.toLowerCase() === '.jpg')
            return AlbumDataBuilder.buildJpg(directoryTreeFile);

        throw 'Error building file, expecting only JSON and JPG files'
            + 'but read file ' + directoryTreeFile.path;
    },
    buildJson: function(directoryTreeFile, node, onSuccess) {
        this.JsonFileReader.read(directoryTreeFile.path, function(data) {
            node.push(data);
            onSuccess(node);
        }, function(error) {
            throw error;
        });
    },
    buildJpg: function(directoryTreeFile, node) {
        node.push({
            name: directoryTreeFile.name,
            path: directoryTreeFile.path
        });
    }
};

module.exports = AlbumDataBuilder;