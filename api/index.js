const express = require('express');
const ApiRouteConfiguration = require('./ApiRouteConfiguration');

const app = express();

app.get('/', (request, response) => response.send("Hello"));
ApiRouteConfiguration.configureApiRoutes(app);

const port = 3000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});