const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const PostSchema = new Schema({
    title:{
        type: String,
        required: true
        },
    user:{
        type: Schema.Types.ObjectId,
        ref:'users',
    },
    info:{
        type: String,
        required: true
        },

});


module.exports = mongoose.model('posts', PostSchema);
