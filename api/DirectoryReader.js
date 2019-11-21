let DirectoryTree = require('directory-tree');

let DirectoryReader = {
    read: function(path, extensions, callback) {
        return DirectoryTree(path, extensions, callback);
    },
    isDirectory: function(directoryTree) {
        return directoryTree.children;
    }
};

module.exports = DirectoryReader;