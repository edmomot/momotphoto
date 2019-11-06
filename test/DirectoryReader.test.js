let chai = require('chai');
let expect = chai.expect;
let DirectoryReader = require('../api/DirectoryReader');

let nonexistentPath = './NONEXISTENT_DIR';
let path = './test/mocks';

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
        expect(expectedFiles.length).to.at.least(1);
    });

    it('executes a callback function', function() {
        let i = 0;
        let result = DirectoryReader.read(path, [], function() { i++ });
        expect(result).to.not.be.null;
        expect(i).to.at.least(1);
    });

    it('identifies a file is not a directory', function() {
        let file = {
            "path": "photos/winter/january/snowboard.jpg",
            "name": "snowboard.jpg",
            "size": 100,
            "extension": ".jpg"
        };

        let isDirectory = DirectoryReader.isDirectory(file);
        expect(isDirectory).to.not.be.ok;
    });

    it('identifies a directory', function() {
        let directory = { "path": "photos/summer/june",
            "name": "june",
            "size": 400,
            "children": [
            {
                "path": "photos/summer/june/windsurf.jpg",
                "name": "windsurf.jpg",
                "size": 400,
                "extension": ".jpg"
            }
            ]
        };

        let isDirectory = DirectoryReader.isDirectory(directory);
        expect(isDirectory).to.be.ok;
    });

});