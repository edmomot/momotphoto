const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const compression = require('compression');
const apiCache = require('apicache');

const app = express();

app.use(apiCache.middleware('3 days'));

app.use(compression());

app.use(history());
app.use(express.static(path.join(__dirname, '../dist')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});