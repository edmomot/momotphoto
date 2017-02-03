var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var ExifReader = require('./../src/server/exif-reader');

let image = './test/mock-directory/bird.jpg';
let nonexistentFile = './test/mock/directory/NONEXISTENT_FILE.jpg';

describe('ExifReader', function() {

    it('executes success callback on existing image', function(done) {
        let onSuccess = function() {
            done();
        };
        let onFailure = function() {
            assert.fail(0, 1, 'Failure callback executed when it should not be');
        };

        ExifReader.read(image, onSuccess, onFailure);
    });


    it('executes fail callback on nonexistent image', function(done) {
        let onSuccess = function() {
            assert.fail(0, 1, 'Success callback executed when it should not be')
        };
        let onFailure = function() {
            done();
        };

        ExifReader.read(nonexistentFile, onSuccess, onFailure);
    });
});