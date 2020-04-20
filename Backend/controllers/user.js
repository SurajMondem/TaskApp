const User = require("../models/user");


exports.getUserById = (request, response, next, id) => {
    User.findById(id).exec((error, user) => {
        if(error || !user){
            return response.status(400).json({
                error: "No User was found in DB"
            })
        }
        //console.log(user);
        request.profile = user;
        console.log(request.profile);
        next();
    });
    
};

exports.getUser = (request, response) => {
    request.profile.salt = undefined;
    request.profile.encry_password = undefined;
    return response.json(request.profile);
}