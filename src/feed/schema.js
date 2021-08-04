'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedSchema = new Schema({
    searchString:{
        type: String,
    },
    title:{
        type: String,
    },
    link:{
        type: String,
    },
    keywords: [{
        type: String
    }],
    creator: [{
        type: String
    }],
    video_url: {
        type: String,
        default : null
    },
    description: {
        type: String
    },
    content: {
        type: String
    },
    pubDate:{
        type: String
    },
    image_url:{
        type: String,
        default: null
    },
    source_id:{
        type: String
    }
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});


const feed = mongoose.model('Feed', FeedSchema);
module.exports = feed;