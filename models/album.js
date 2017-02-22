let Album = function() {
    this.albums = [];
    this.images = [];
};

Album.prototype = {
    addImage: function(image) {
        this.images.push(image);
    },
    setDescription: function(description) {
        this.description = description;
    },
    addAlbum: function(album) {
        this.albums.push(album);
    }
};

module.exports = Album;