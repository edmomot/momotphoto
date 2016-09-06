var DirectoryToJson = require('../../watch/directory-to-json');


describe("DirectoryToJson", function() {
    const testFilesPath = './stuff';

    it("should exist", function(){
        expect(DirectoryToJson).toBeTruthy();
    });

    it("should be defined on new", function(){
        var dirToJson = new DirectoryToJson(testFilesPath)
        expect(dirToJson).toBeTruthy();
    });

    it("should find some files in test directory", function() {
        var dirToJson = new DirectoryToJson(testFilesPath)

        var files = dirToJson.getAllFiles();

        console.log(files);
        expect(files).toBeTruthy();
    });
});