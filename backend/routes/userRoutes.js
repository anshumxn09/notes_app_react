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

userRoute.route("/get/blogs").get(isAuthenticated, userController.getBlogs)
userRoute.route("/password/update").put(isAuthenticated, userController.updatePassword)
userRoute.route("/blog/edit/:id")
    .put(isAuthenticated, userController.updateBlog)
    .delete(isAuthenticated, userController.deleteBlog)

module.exports = userRoute;