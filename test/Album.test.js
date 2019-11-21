let chai = require('chai');
let expect = chai.expect;
let Album = require('./../models/album');

describe('Album', function() {
   it('should create a new instance', function() {
       let album = new Album();
       expect(album).to.not.be.undefined;
       expect(album.addImage).to.not.be.undefined;
       expect(album.setDescription).to.not.be.undefined;
       expect(album.addAlbum).to.not.be.undefined;
   });

   it('allows setting properties', function() {
       let album = new Album();
       album.addImage({some: 'image'});
       album.addAlbum({an: 'album'});
       album.setDescription({hello: 'world'});

       expect(album.images[0].some).to.equal('image');
       expect(album.albums[0].an).to.equal('album');
       expect(album.description.hello).to.equal('world');
   });
});