const mongoose = require('mongoose');

let playListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    movies: [
        {
            type: String,
            required: true,
        }
    ],
    isPublic: {
        type: Boolean,
        required: true
    }
});

const PlayList = mongoose.model('PlayList', playListSchema);

module.exports = PlayList;
