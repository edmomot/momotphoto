const ExifMap = {
    width: x => x.exif.ExifImageWidth,
    height: x => x.exif.ExifImageHeight,
    iso: x => x.exif.ISO,
    focalLength: x => x.exif.FocalLength,
    exposureTime: x => x.exif.ExposureTime,
    fNumber: x => x.exif.FNumber,
    lensModel: x => x.exif.LensModel,
    caption: x => x.image.ImageDescription,
    cameraModel: x => x.image.Model,
};

module.exports = ExifMap;