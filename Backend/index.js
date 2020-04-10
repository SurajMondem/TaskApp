const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

const databaseUrl = "mongodb://localhost:27017/Task";

mongoose.connect(databaseUrl ,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true 
    })
    .then(() => {
        console.log("DATABASE CONNECTED...");
    });

app.get('/', (request, response) => {
    return response.send('Hello world')
});

app.listen(port, () => {
    console.log('Server Started at 4000...')
});
