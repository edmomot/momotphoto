let fetch = require('fetch');

export function get(apiUrl) {
    return fetch(apiUrl, { method: 'get' })
        .then(response => response.json());
}