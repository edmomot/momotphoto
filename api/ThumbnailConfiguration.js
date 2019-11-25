
const thumbnailSizes = [ 200 ];

function allThumbnailSizesRegex() {
    return new RegExp(thumbnailSizes.map(thumbnailSubFolder).join('|'));
}

function thumbnailSubFolder(thumbnailSize) {
    return 'thumb_' + thumbnailSize;
}

module.exports = { thumbnailSizes, allThumbnailSizesRegex, thumbnailSubFolder };