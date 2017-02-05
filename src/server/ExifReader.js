let ExifImage = require('exif').ExifImage;

let ExifReader = {
    read: function(path, onSuccess, onFailure) {
        try {
            new ExifImage({ image : path }, function (error, exifData) {
                if (error) {
                    onFailure(error);
                } else {
                    ExifReader.onSuccess(exifData, onSuccess);
                }
            });
        } catch (error) {
            onFailure(error);
        }
    },
    onSuccess: function(exifData, onSuccess) {
        onSuccess(exifData);
    }
};

module.exports = ExifReader;