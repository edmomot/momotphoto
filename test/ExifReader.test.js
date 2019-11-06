let chai = require('chai');
let expect = chai.expect;
let assert = chai.assert;
let ExifReader = require('../api/ExifReader');

let image = './test/mocks/bird.jpg';
let nonexistentFile = './test/mocks/NONEXISTENT_FILE.jpg';

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