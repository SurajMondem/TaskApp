const User = require("../models/user");
const Cart = require("../models/cart");


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

exports.getAllUsers = (request, response) => {
    User.find().exec((error, users) => {
        if(error || !users){
            return response.status(400).json({
                error: "No Users found"
            });
        };
        response.json(users);
    });
}

exports.updateUser = (request, response) => {
    User.findByIdAndUpdate(
        {_id : request.profile._id},
        {$set: request.body},
        {new: true, useFindAndModify: false},
        (error, user) => {
            if(error) {
                return response.status(400).json({
                    error: "You are not Authorized to update"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            response.json(user);
        }
    )
}

exports.userBoard = (request, response) => {
    Cart.find({user: request.profile._id})
    .populate("user", "_id name")
    .exec((error, cart) => {
        if(error){
            return response.status(400).json({
                error: "No Boards Created in this account"
            });
        }
        return response.json(cart);
    });
}

exports.pushBoardInList = (request, response, next) => {
    
    let boards = [];
    request.body.cart.boards.forEach((board) => {
        boards.push({
            _id: board._id,
            name: board.name,
            description: board.description,

        })
    });
    
    //STORE THIS IN DB
    User.findOneAndUpdate(
        {_id: request.profile._id},
        {$push: {boards: boards}},
        {new: true},
        (error, purchases) => {
            if(error){
                return response.status(400).json({
                    error: "Unable to save Boards list"
                });
            }
            next();
        }
    );
};