const User = require("../models/user");
var { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (request, response) => {

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

exports.signin = (request, response) => {
    const { email, password } = request.body;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({email}, (error, user) => {
        if(error || !user){
            return response.status(400).json({
                error: "USER email address does not match" 
            });
        }

        if(!user.authenticate(password)){
            return response.status(401).json({
                error: "Email and password do not match"
            })
        }

        //CREATE TOKEN
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        
        //PUT TOKEN IN COOKIE
        response.cookie("token", token, {expire: new Date() + 9999});

        //SEND RESPONSE TO FRONTEND
        const {_id, firstname, email, role} = user;
        return response.json({token, user: {_id, firstname, email, role}});

    });

}


exports.signout = (request, response) => {
    response.clearCookie("token");

    response.json({
        message: "User Signout Success"
    });
}

//PROTECTED ROUTES
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})

//CUSTOM MIDDLEWARES
exports.isAuthenticated = (request, response, next) => {
    let checker = request.profile && request.auth && request.profile._id == request.auth._id;
    console.log(request.auth);
    console.log(request.profile);
    if(!checker){
        return response.status(403).json({
            error: "ACCESS DENIED1"
        });
    }
    next();
};

exports.isAdmin = (request, response, next) => {
    if(request.profile.role === 0){
        return response.status.json({
            error: "ADMIN ACCESS DENIED"
        });
    }
    next();
};