const mongoose = require('mongoose');
const crypto = require('bcryptjs');
const jsonwebtokn = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
    },
    avatar : {
        public_id : {
            type : String,
            required : true,
        },
        url : {
            type : String,
            required : true
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        select : false,
        minlength : [8, "Password must be more than 8 characters"]
    },
    dateCreated : {
        type : Date,
        default : new Date(Date.now())
    }
}, {
    timestamps : true
})

userSchema.methods.generateToken = async function(){
    return jsonwebtokn.sign({_id : this._id}, process.env.SECRET_KEY);
}

userSchema.methods.comparePassword = async function(password){
    return crypto.compare(password, this.password);
}

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await crypto.hash(this.password, 12);
    }
    next();
})

module.exports = mongoose.model("User", userSchema);