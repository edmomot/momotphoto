let chai = require('chai');
let expect = chai.expect;
let AlbumDataBuilder = require('./../src/server/AlbumDataBuilder');

let path = './test/mocks';

describe('AlbumDataBuilder', function() {
    it('should append an image node with name and path properties', function () {
        let dir = {name: "bah", path: "humbug"};
        let result = {};
        AlbumDataBuilder.buildJpg(dir, result);
        expect(result.images).to.have.lengthOf(1);
        expect(result.images[0].name).to.equal("bah");
        expect(result.images[0].path).to.equal("humbug");
    });

    it('should append a JSON node object with the file contents', function(done) {
        let dir = {name: "bah", path: "humbug"};
        let currentNode = {};

        let mockJson = {
            some: "property",
            and: "another one"
        };

        mockJsonFileReader =  {
            read: function(path, onSuccess) {onSuccess(mockJson);}
        };

        AlbumDataBuilder.init(null, mockJsonFileReader);
        AlbumDataBuilder.buildJson(dir, currentNode, function(node) {
            expect(node.description.some).to.equal("property");
            expect(node.description.and).to.equal("another one");
            expect(node).to.eql(currentNode);
            done();
        });
    });

    it('should create a Json node when extension is .json', function(done) {
        let mockJson = {
            some: "property",
            and: "another one"
        };

        mockJsonFileReader =  {
            read: function(path, onSuccess) {onSuccess(mockJson);}
        };

        AlbumDataBuilder.init(null, mockJsonFileReader);

        const directoryTreeFile = {name: "bah", path: "humbug", extension: '.json' };
        const node = {};
        const onSuccess = function() {
            expect(node.description.some).to.equal("property");
            expect(node.description.and).to.equal("another one");
            expect(node).to.eql(node);
            done();
        };

        AlbumDataBuilder.buildFile(directoryTreeFile, node, onSuccess)
    });


    it('should create an image node when extension is .jpg', function(done) {
        AlbumDataBuilder.init(null, null);

        const directoryTreeFile = {name: "bah", path: "humbug", extension: '.jpg' };
        const node = {};
        const onSuccess = function() {
            expect(node.images).to.not.be.undefined;
            expect(node.images.length).to.equal(1);
            expect(node.images[0].name).to.equal(directoryTreeFile.name);
            expect(node.images[0].path).to.equal(directoryTreeFile.path);
            done();
        };

        AlbumDataBuilder.buildFile(directoryTreeFile, node, onSuccess)
    });

    it('should read nested directories', function(done) {
        const directoryTreeFile = {
            name: 'parent',
            path: 'parentPath',
            directory: true,
            children: [
                {
                    name: 'child1',
                    path: 'parent/child1',
                    directory: true,
                    children: [
                        {
                            name: 'description.json',
                            path: 'parent/child1/description.json',
                            extension: '.json'
                        },
                        {
                            name: 'someImage1.jpg',
                            path: 'parent/child1/someImage1.jpg',
                            extension: '.jpg'
                        }
                    ]
                },
                {
                    name: 'child2',
                    path: 'parent/child2',
                    directory: true,
                    children: [
                        {
                            name: 'description2.json',
                            path: 'parent/child2/description2.json',
                            extension: '.json'
                        },
                        {
                            name: 'someImage2.jpg',
                            path: 'parent/child2/someImage2.jpg',
                            extension: '.jpg'
                        },
                        {
                            name: 'someImage3.jpg',
                            path: 'parent/child2/someImage3.jpg',
                            extension: '.jpg'
                        }
                    ]
                }
            ]
        };

        const directoryReader = {
            isDirectory: function(dir) {
                return dir.directory;
            }
        };


        let mockJson = {
            some: "property",
            and: "another one"
        };

        mockJsonFileReader =  {
            read: function(path, onSuccess) {onSuccess(mockJson);}
        };

        AlbumDataBuilder.init(directoryReader, mockJsonFileReader);

        const assert = function(data) {
            expect(data.albums.length).to.equal(1);
            expect(data.albums[0].name).to.equal('parent');

            expect(data.albums[0].albums.length).to.equal(2);
            expect(data.albums[0].albums[0].name).to.equal('child1');
            expect(data.albums[0].albums[1].name).to.equal('child2');

            expect(data.albums[0].albums[0].description).to.deep.equal(mockJson);
            expect(data.albums[0].albums[0].images.length).to.equal(1);
            expect(data.albums[0].albums[0].images[0].name).to.equal('someImage1.jpg');

            expect(data.albums[0].albums[1].description).to.deep.equal(mockJson);
            expect(data.albums[0].albums[1].images.length).to.equal(2);
            expect(data.albums[0].albums[1].images[0].name).to.equal('someImage2.jpg');
            expect(data.albums[0].albums[1].images[1].name).to.equal('someImage3.jpg');
        };

        AlbumDataBuilder.build(directoryTreeFile).then(result  => {
            try {
                assert(result);
                done();
            } catch(err) {
                done(err);
            }
        }, reason => {
            done(reason);
        });
    });
});