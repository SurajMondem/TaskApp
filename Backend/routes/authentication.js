// REQUIRED IMPORTS
var express = require('express')
var router = express.Router()
var {check, validationResult} = require('express-validator');

//CONTROLLER IMPORTS
const {signout, signup, signin, isSignedIn} = require("../controllers/authentication")



//ROUTERS
router.post("/signup",
    [
        check("firstname", "name should be at least 3 char").isLength({min: 3}),
        check("email", "email is required").isEmail({min: 5}),
        check("password", "password should be at least 3 char").isLength({min: 3}),
    ], signup);

router.post("/signin",
    [
        check("email", "email is required").isEmail({ min: 5 }),
        check("password", "password is required").isLength({ min: 1 }),
    ], signin);

router.get("/signout", signout);


module.exports = router;