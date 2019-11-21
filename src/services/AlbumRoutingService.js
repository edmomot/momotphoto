import Album from '../components/Album';

function AlbumRoutes(albums) {
    return albums.flatMap(AlbumRoutesRecursive);
}

function AlbumRoutesRecursive(album) {
    if (album.albums) {
        if (!album.name) {
            return album.albums.flatMap(AlbumRoutesRecursive);
        }

        return [
            singleAlbumRoute(album),
            ...album.albums.flatMap(AlbumRoutesRecursive)
        ];
    }

    return [ singleAlbumRoute(album) ];
}

function singleAlbumRoute(album) {
    return {
        path: album.route + '/',
        component: Album,
        name: album.name,
        props: { album }
    }
}

export default { AlbumRoutes };