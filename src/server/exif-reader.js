var ExifImage = require('exif').ExifImage;

let ExifReader = {
    read: function(path, onSuccess, onFailure) {
        try {
            new ExifImage({ image : path }, function (error, exifData) {
                if (error) {
                    console.log('Error: ' + error.message);
                    onFailure();
                }
                ExifReader.onSuccess(exifData, onSuccess);
            });
        } catch (error) {
            console.log('Error: ' + error.message);
            onFailure();
        }
    },
    onSuccess: function(exifData, onSuccess) {
        onSuccess(exifData);
    }
};

module.exports = ExifReader;