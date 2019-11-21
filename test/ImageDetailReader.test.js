let chai = require('chai');
let expect = chai.expect;
let assert = chai.assert;
let ExifReader = require('../api/ImageDetailReader');

let image = './test/mocks/bird.jpg';
let nonexistentFile = './test/mocks/NONEXISTENT_FILE.jpg';

function assertOnSuccess(done, assertion) {
    let onSuccess = function(result) {
        assertion(result);
        done();
    };
    let onFailure = function() {
        assert.fail(0, 1, 'Failure callback executed when it should not be');
    };

    ExifReader.read(image, onSuccess, onFailure);
}

describe('ExifReader', function() {
    it('executes success callback on existing image', function(done) {
        assertOnSuccess(done,result => {});
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

    it('contains height', function(done) {
        assertOnSuccess(done,result => assert.isNotNaN(result.height));
    });

    it('contains width', function(done) {
        assertOnSuccess(done,result => assert.isNotNaN(result.width));
    });

    it('contains iso', function(done) {
        assertOnSuccess(done,result => assert.isNotNaN(result.iso));
    });

    it('contains caption', function (done) {
        assertOnSuccess(done, result => { assert.isString(result.caption); console.log(result)})
    })
});