let chai = require('chai');
let expect = chai.expect;
let AlbumDataBuilder = require('./../src/server/AlbumDataBuilder');
let MockRequire = require('mock-require');

let nonexistentPath = './NONEXISTENT_DIR';
let path = './test/mocks';




describe('AlbumDataBuilder', function() {
    it('should append a JPG node object with name and path properties', function () {
        let dir = {name: "bah", path: "humbug"};
        let result = [];
        AlbumDataBuilder.buildJpg(dir, result);
        expect(result).to.have.lengthOf(1);
        expect(result[0].name).to.equal("bah");
        expect(result[0].path).to.equal("humbug");
    });

    it('should append a JSON node object with the file contents', function(done) {
        let dir = {name: "bah", path: "humbug"};
        let currentNode = [];

        let mockJson = {
            some: "property",
            and: "another one"
        };

        mockJsonFileReader =  {
            read: function(path, onSuccess) {onSuccess(mockJson);}
        };

        AlbumDataBuilder.init(null, mockJsonFileReader);
        AlbumDataBuilder.buildJson(dir, currentNode, function(node) {
            expect(node).to.have.lengthOf(1);
            expect(node[0].some).to.equal("property");
            expect(node[0].and).to.equal("another one");
            expect(node).to.eql(currentNode);
            done();
        });
    });

});