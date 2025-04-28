const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true,
        unique: true
    },
    title: String,
    description: String,
    publishedAt: Date,
    thumbnails: {
        default: String,
        medium: String,
        high: String
    },
    channelTitle: String,
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Video', videoSchema);
