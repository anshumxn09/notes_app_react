const userSchema = require("../schema/userSchema");
const emailValidator = require('email-validator');
const blogSchema = require("../schema/blogSchema");
const cloudinary = require('cloudinary');

const userController = {
    register : async (req, res) => {
        try {
            const {firstName, lastName, email, avatar, password} = req.body;

            const getUser = await userSchema.findOne({
                email
            })

            if(getUser){
                return res.status(400).json({
                    success : false,
                    message : "user already exists"
                })
            }

            if(!firstName || !lastName || !email || !password){
                return res.status(400).json({
                    success : false,
                    message : "some fields are missing"
                })
            }


            if(!emailValidator.validate(email)){
                return res.status(400).json({
                    success : false,
                    message : "invalid email"
                })
            }
            let image_upload = {
                public_id : "image.public_id",
                url : "https://res.cloudinary.com/anshumxn09/image/upload/v1677756698/Post/vciuulx48ce4zfkcvvqm.jpg"
            }
            if(avatar){
                const image = await cloudinary.v2.uploader.upload(avatar, {
                    folder : "Blog"
                })
                image_upload.public_id = image.public_id;
                image_upload.url = image.secure_url;
            } 

            const user = new userSchema({
                firstName, lastName, email, avatar : image_upload, password
            })

            await user.save();

            const token = await user.generateToken();

            return res.cookie("token", token, {
                expires : new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly : true
            }).status(200).json({
                success : true,
                user
            })

        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    login : async (req, res) => {
        try {
            const {email, password}= req.body;
            const user = await userSchema.findOne({email}).select("+password");

            if(!user){
                return res.status(400).json({
                    success : false,
                    message : "user does't exists"
                })
            }

            const isMatch = await user.comparePassword(password);

            if(!isMatch){
                return res.status(400).json({
                    success : false,
                    message : "invalid credentials"
                })
            }

            const token = await user.generateToken();

            return res.cookie("token", token, {
                httpOnly : true,
                expires : new Date(Date.now() + 1000 * 60 * 60 * 24)
            }).status(200).json({
                success : true,
                user,
                token,
                message : "login successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    logout : async (req, res) => {
        try {
            return res.cookie("token", null, {
                expires : new Date(Date.now()),
                httpOnly : true
            }).status(200).json({
                success : true,
                message : "logged out successfully"
            })
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    getMyDetails : async (req, res) => {
        try {
            const user = await userSchema.findById({
                _id : req.user._id
            })

            return res.status(200).json({
                success : true,
                user
            })
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    updateProfile : async (req, res) => {
        try {
            const {firstName, lastName, avatar} = req.body;

            const user = await userSchema.findById(req.user._id);

            if(avatar){
                const image = await cloudinary.v2.uploader.upload(avatar, {
                    folder : "Blog"
                })
                await cloudinary.v2.uploader.destroy(user.avatar.public_id);
                user.avatar.public_id = image.public_id;
                user.avatar.url = image.secure_url;
            }

            user.firstName = firstName;
            user.lastName = lastName;
            
            await user.save();
            return res.status(200).json({
                success : true,
                message : "profile updated successfully"
            })

        } catch (error) {
           return res.status(500).json({
            success : false,
            message : error.message
           }) 
        }  
    },
    deleteProfile : async (req, res) => {
        try {
            const user = await userSchema.findByIdAndRemove(req.user._id)

            if(!user){
                return res.status(400).json({
                    success : false,
                    message : "user doesn't exists"
                })    
            }

            return res.status(200).json({
                success : true,
                message : "profile deleted successfully"
            })

        } catch (error) {
           return res.status(500).json({
            success : false,
            message : error.message
           }) 
        }  
    },
    updatePassword : async (req, res) => {
        try {
            const {oldpass, newpass} = req.body;

            if(!oldpass || !newpass){
                return res.status(400).json({
                    success : false,
                    message : "some fields are missing"
                })
            }

            const user = await userSchema.findById(req.user._id).select("+password")
            const isMatch = await user.comparePassword(oldpass);

            if(!isMatch){
                return res.status(400).json({
                    success : false,
                    message : "incorrect old password"
                })
            }

            user.password = newpass;
            await user.save();

            return res.status(200).json({
                success : true,
                message : "password updated successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    getBlogs : async (req, res) => {
        try {

            // Pagination
            const page = req.query.page || 1;
            const items_per_page = 3;
            const skip = items_per_page * (page - 1);

            let query = {owner  : req.user._id}
            let sortQuery = {dateCreated : -1}
            const {search, sort} = req.query;

            if(search){
                query.title = {
                    $regex : search,
                    $options : "i"
                }
            }

            if(sort !== "Default"){
                delete sortQuery.dateCreated;
                sortQuery.title = sort === "a-z" ? 1 : -1;
            }

            // count the number of blogs, to display the number of pages in the frontend side.

            const blogsCount = await blogSchema.countDocuments(query).sort(sortQuery);

            const blogs = await blogSchema.find(query)
            .sort(sortQuery)
            .limit(items_per_page)
            .skip(skip);

            const numberOfPages = Math.ceil(blogsCount/items_per_page);

            return res.status(200).json({
                success : true,
                blogs,
                blogsCount,
                numberOfPages
            })
            
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    updateBlog : async (req, res) => {
        try {
            const {title, description} = req.body;
            const {id} = req.params;
            const blog = await blogSchema.findById(id);

            if(!blog){
                return res.status(400).json({
                    success : false,
                    message : "note doesn't exists"
                })
            }

            if(blog._id.owner === req.user._id){
                return res.status(400).json({
                    success : false,
                    message : "invalid authentication"
                })
            }

            blog.title = title;
            blog.description = description;

            await blog.save();
            return res.status(200).json({
                success : true,
                message : "note updated successfully"
            })
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    deleteBlog : async (req, res) => {
        try {
            const {id} = req.params;
            await blogSchema.findByIdAndRemove(id);

            return res.status(200).json({
                success : true,
                message : "successfully deleted a note"
            })

        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    },
    getSingleBlogs : async (req, res) => {
        try {
            const blog = await blogSchema.findById(req.params.id);

            if(!blog){
                return res.status(400).json({
                    success : false,
                    message : "Note with this id doesn't exists"
                })  
            }

            return res.status(200).json({
                success : true,
                blog
            })
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    }
}

module.exports = userController;