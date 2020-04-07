const express = require("express");

const app = express();

const port = 4000;

app.get('/', (request, response) => {
    return response.send('Hello world')
});

app.listen(port, () => {
    console.log('Server Started at 4000...')
});
