const mongoose = require('mongoose')

const { Schema } = mongoose;

const userSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    content : {
        type: String,
        required: true,
    },
    

},
{timestamps: true});

const Note = mongoose.model('note',userSchema)

module.exports = { Note }