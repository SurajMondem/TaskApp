const express = require("express")
const router = express.Router()

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/authentication");
const { getUserById, getUser, getAllUsers, updateUser, userBoard} = require("../controllers/user");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//router.get("/users", getAllUsers); FOR ALL BOARDS

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get("/board/:userId", isSignedIn, isAuthenticated, userBoard);


module.exports = router;


