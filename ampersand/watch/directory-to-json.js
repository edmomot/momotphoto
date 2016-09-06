var DirectoryTree = require('../../../node-directory-tree/lib/directory-tree');

module.exports = function(path) {
    this.path = path;

    this.getAllFiles = function() {
        result = DirectoryTree(this.path);
        return result;
    };

    this.getAllTextFiles = function() {
        return DirectoryTree(this.path, ['.txt']);
    }
};
