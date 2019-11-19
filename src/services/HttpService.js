const fetch = require('node-fetch');

function get(apiUrl) {
    return fetch(apiUrl, { method: 'get' })
        .then(response => response.json());
}

module.exports = { get };