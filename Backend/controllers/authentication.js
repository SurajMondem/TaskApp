const User = require("../models/user");
var { check, validationResult } = require('express-validator');


exports.signin = (request, response) => {

    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(422).json({
            error: errors.array()[0].msg
        })
    }


    const user = new User(request.body)
    user.save((error , user) => {
        if(error){
            console.log(error);
            return response.status(400).json({
                error: "USER DID NOT SAVE IN DB"
            })
        }
        response.json({
            name: user.firstname,
            email: user.email,
            id: user._id
        });
    })
}

exports.signout = (request, response) => {
    response.json({
        message: "User Signout Success"
    });
}

