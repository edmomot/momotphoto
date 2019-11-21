let fs = require('fs');

let JsonFileReader = {
    read: function (path, onSuccess, onFailure) {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                onFailure(err);
            } else {
                onSuccess(JSON.parse(data));
            }
        });
    }
};

module.exports = JsonFileReader;