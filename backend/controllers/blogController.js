const blogSchema = require("../schema/blogSchema");

const blogController = {
    createBlog : async (req, res) => {
        try {
            const {title, description} = req.body;

            if(!title || !description){
                return res.status(400).json({
                    success : false,
                    message : "some fields are missing"
                }) 
            }

            const blog = new blogSchema({
                title, description, owner  : req.user._id
            })

            await blog.save();
            return res.status(200).json({
                success : true,
                message : "Note created successfully"
            }) 

        } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
        }
    }
}

module.exports = blogController;