const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim: true,
    },
    description : {
        type : String,
        required : true,
        trim: true,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    dateCreated : {
        type : Date,
        default : new Date(Date.now()),
    },

}, {
    timestamps : true
})

module.exports = mongoose.model('Blog',  blogSchema)