const express = require('express');
const ApiRouteConfiguration = require('./ApiRouteConfiguration');
const history = require('connect-history-api-fallback');
const path = require('path');

const app = express();

ApiRouteConfiguration.configureApiRoutes(app);

app.use(history());
app.use(express.static(path.join(__dirname, '../web/dist')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});