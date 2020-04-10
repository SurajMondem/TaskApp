// REQUIRED IMPORTS
var express = require('express')
var router = express.Router()

//CONTROLLER IMPORTS
const {signout, signin} = require("../controllers/authentication");



//ROUTERS
router.post("/signup", signin);
router.get("/signout", signout);

module.exports = router;