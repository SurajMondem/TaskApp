require('dotenv').config();

//PACKAGE.JSON IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//ROUTER IMPORTS
const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");

//STARTER
const app = express();
const port = process.env.PORT;
const databaseUrl = process.env.DATABASE;


//DATABASE CONNECTION
mongoose.connect(databaseUrl ,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true 
    })
    .then(() => {
        console.log("DATABASE CONNECTED...");
    }).catch(
       () => {console.log("DATABASE CONNECTION FAILED");}
    );

//MIDDLEWARES
app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors());

//ROUTES
app.get('/', (request, response) => {
    return response.send('Hello world')
});

app.use('/api', authRoutes);
app.use('/api', userRoutes);

// // TEST CODE STARTS!!!
// admin = (request, response) => {
//     return response.send('Welcome to Admin Dashboard');
// }

// app.get('/admin',admin);

// // TEST CODE ENDS!!!

app.listen(port, () => {
    console.log(`Server Started at ${port}...`);
});
