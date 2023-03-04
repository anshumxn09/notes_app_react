const blogRouter = require('express').Router()
const blogController = require('../controllers/blogController');
const { isAuthenticated } = require('../middleware/auth');

blogRouter.route("/blog/create")
    .post(isAuthenticated,blogController.createBlog)

module.exports = blogRouter;