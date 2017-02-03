let DirectoryTree = require('directory-tree');

let DirectoryReader = {
    read: function(path, extensions, callback) {
        return DirectoryTree(path, extensions, callback);
    }
}

module.exports = DirectoryReader;