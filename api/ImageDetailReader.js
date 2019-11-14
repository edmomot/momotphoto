const exifImage = require('exif').ExifImage;
const imageSize = require('image-size');

function readSize(path) {
    return new Promise((resolve, reject) => {
        imageSize(path, (error, dimensions) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(dimensions);
        })
    })
        .then(mapImageSize)
        .catch(error => console.error('Could not read dimensions of image at path: ' + path + '\n  ' + error));
}

function mapImageSize(imageSizeResult) {
    return {
        width: imageSizeResult.width,
        height: imageSizeResult.height
    }
}

function readExif(path) {
    return new Promise((resolve, reject) => {
        try {
            new exifImage({ image : path }, function (error, exifData) {
                if (error) {
                    reject(error);
                } else {
                    resolve(exifData);
                }
            });
        } catch (error) {
            reject(error);
        }
    })
        .then(mapExifData)
        .catch(error => console.error('Could not read exif of image at path: ' + path + '\n  ' + error));
}

function mapExifData(exifResult) {
    return {
        iso: exifResult.exif.ISO,
        focalLength: exifResult.exif.FocalLength,
        exposureTime: exifResult.exif.ExposureTime,
        fNumber: exifResult.exif.FNumber,
        lensModel: exifResult.exif.LensModel,
        caption: exifResult.image.ImageDescription,
        cameraModel: exifResult.image.Model,
    }
}

let ImageDetailReader = {
    read: function(path, onSuccess, onFailure) {
        let exif = readExif(path);
        let size = readSize(path);
        
        return Promise.all([exif, size])
            .then(values => onSuccess(({ ...values[0], ...values[1] })))
            .catch(onFailure);
    }
};

module.exports = ImageDetailReader;