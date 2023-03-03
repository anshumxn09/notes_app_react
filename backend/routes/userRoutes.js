const userRoute = require('express').Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');

userRoute.route("/register").post(userController.register);
userRoute.route("/login").post(userController.login);
userRoute.route("/logout").get(userController.logout);
userRoute.route("/me")
    .get( isAuthenticated , userController.getMyDetails)
    .put(isAuthenticated, userController.updateProfile)
    .delete(isAuthenticated, userController.deleteProfile)

module.exports = userRoute;