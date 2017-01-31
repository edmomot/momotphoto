var chai = require('chai');
var expect = chai.expect;
var DirectoryReader = require('./../directory-reader');

let nonexistentPath = './NONEXISTENT_DIR';
let path = './test/mock-directory';

describe('DirectoryReader', function() {
    it('should return null on a nonexistent directory', function() {
       let result = DirectoryReader.read(nonexistentPath);
       expect(result).to.be.null;
    });

    it('should read an empty directory', function() {
        let result = DirectoryReader.read(path);
        expect(result).to.not.be.null;
        expect(result.path).to.equal(path);
    });

    it('reads a file', function() {
        let result = DirectoryReader.read(path);
        expect(result.children.length).to.be.at.least(1);
        let expectedFiles = result.children.filter(function(x) { return x.name === 'file1.txt'});
        expect(expectedFiles.length).to.equal(1);
    });

    it('executes a callback function', function() {
        let i = 0;
        let result = DirectoryReader.read(path, [], function() { i++ });
        expect(result).to.not.be.null;
        expect(i).to.equal(1);
    });

    
});