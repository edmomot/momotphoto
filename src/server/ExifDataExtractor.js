
let ExifDataExtractor = {
    getIso: function(exifJson) { return exifJson.exif.ISO; },
    getFocalLength: function(exifJson) { return exifJson.exif.FocalLength },
    getExposureTime: function(exifJson) { return exifJson.exif.ExposureTime },
    getFNumber: function(exifJson) { return exifJson.exif.FNumber },
    getLensModel: function(exifJson) { return exifJson.exif.LensModel },
    getCaption: function(exifJson) { return exifJson.image.ImageDescription },
    getCameraModel: function(exifJson) { return exifJson.image.Model }
};

module.exports = ExifDataExtractor;