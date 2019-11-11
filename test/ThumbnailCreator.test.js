const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const thumbnailCreator = require('../api/ThumbnailCreator');

describe('Thumbnail creator', function() {
    it('Doesn\'t fail', function(done) {
        thumbnailCreator.createMissingAlbumThumbnails('../web/public/albums');
        assert.isTrue(true);
    });
});