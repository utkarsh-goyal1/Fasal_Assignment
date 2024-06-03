const mongoose = require('mongoose');
const PlayList = require('./PlayList')
let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdLists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PlayList'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
