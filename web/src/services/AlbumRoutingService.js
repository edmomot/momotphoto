import Album from '../components/Album';

function AlbumRoutes(albums) {
    return AlbumRoutesRecursive(albums);
}

function AlbumRoutesRecursive(album) {
    if (album.albums) {
        // if (!album.url) {
        //     return album.albums.flatMap(AlbumRoutesRecursive);
        // }

        return [
            singleAlbumRoute(album),
            ...album.albums.flatMap(AlbumRoutesRecursive)
        ];
    }

    return [ singleAlbumRoute(album) ];
}

function singleAlbumRoute(album) {
    return {
        path: '/' + album.url,
        component: Album,
        props: { album }
    }
}

export default { AlbumRoutes };