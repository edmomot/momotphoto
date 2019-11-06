let chai = require('chai');
let expect = chai.expect;

let ExifDataExtractorTest = require('../api/ExifDataExtractor');
let ExifDataStub = require('./exif-data-stub.json');

describe('ExifDataExtractor', function() {
    it('gets iso', function() {
       let result = ExifDataExtractorTest.getIso(ExifDataStub);
       expect(result).to.equal(1000);
    });

    it('gets focal length', function() {
        let result = ExifDataExtractorTest.getFocalLength(ExifDataStub);
        expect(result).to.equal(300);
    });

    it('gets exposure time', function() {
        let result = ExifDataExtractorTest.getExposureTime(ExifDataStub);
        expect(result).to.equal(0.0008);
    });

    it('gets f number', function() {
        let result = ExifDataExtractorTest.getFNumber(ExifDataStub);
        expect(result).to.equal(7.1);
    });

    it('gets lens model', function() {
        let result = ExifDataExtractorTest.getLensModel(ExifDataStub);
        expect(result).to.equal("EF70-300mm f/4-5.6 IS USM");
    });

    it('gets caption', function() {
        let result = ExifDataExtractorTest.getCaption(ExifDataStub);
        expect(result).to.equal("bird on reeds");
    });

    it('gets camera model', function() {
        let result = ExifDataExtractorTest.getCameraModel(ExifDataStub);
        expect(result).to.equal("Canon EOS 60D");
    });
});
