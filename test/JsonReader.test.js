let chai = require('chai');
let expect = chai.expect;
let assert = chai.assert;

let JsonFileReader = require('../api/JsonFileReader');

let jsonFile = './test/mocks/jsonFile.json';
let nonexistentFile = './test/mock/directory/NONEXISTENT_FILE.jpg';

describe('JsonFileReader', function() {

    it('executes success callback on existing file', function(done) {
        let onSuccess = function(data) {
            expect(data.some).to.equal("stuff");
            expect(data.other).to.equal("things");
            done();
        };
        let onFailure = function(error) {
            assert.fail(0, 1, 'Failure callback executed when it should not be\n' + error)
        };

        JsonFileReader.read(jsonFile, onSuccess, onFailure);
    });


    it('executes fail callback on nonexistent file', function(done) {
        let onSuccess = function() {
            assert.fail(0, 1, 'Success callback executed when it should not be')
        };
        let onFailure = function() {
            done();
        };

        JsonFileReader.read(nonexistentFile, onSuccess, onFailure);
    });
});