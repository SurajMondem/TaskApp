
exports.signin = (request, response) => {
    console.log("REQUEST BODY", request.body);
    response.json({
        message: "Signup Works"
    })
}

exports.signout = (request, response) => {
    response.json({
        message: "User Signout Success"
    });
}

