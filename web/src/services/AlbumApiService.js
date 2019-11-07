const HttpService = require('./HttpService');

const rootApiUrl = '/api';
const allAlbumsApiUrl = rootApiUrl + '/album';

export default {
    getAllAlbums: () => {
        return HttpService.get(allAlbumsApiUrl);
    }
};