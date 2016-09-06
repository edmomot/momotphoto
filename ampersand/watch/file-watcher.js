var Chokidar = require('chokidar');
var DirectoryTree = require('../../node-directory-tree/lib/directory-tree');

module.exports = function() {
    const chokidar =  Chokidar.watch('.',
        {
            ignored: /[\/\\]\./,
            persistent: true
        }).on('all', function(event, path) {
            console.log(event, path);
            this.event = event;
            this.path = path;
        });



}
