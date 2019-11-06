const express = require('express');
const configureApiRoutes = require('./configureApiRoutes');

const app = express();

app.get('/', (request, response) => response.send("Hello"));
configureApiRoutes(app);

const port = 3000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});