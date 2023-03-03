const userSchema = require("../schema/userSchema");
const emailValidator = require('email-validator');

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

            if(!firstName || !lastName || !email || !avatar || !password){
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
            
            const user = new userSchema({
                firstName, lastName, email, avatar, password
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
            const me = await userSchema.findById({
                _id : req.user._id
            })

            return res.status(200).json({
                success : true,
                me
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

            const user = await userSchema.findByIdAndUpdate({
                _id : req.user._id,
            }, {
                firstName, lastName, avatar
            })

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
    }
}

module.exports = userController;