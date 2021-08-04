'use strict';

const axios = require('axios');

const feedModel = require("./schema");

class FeedController {

    static async getFeed(body) {
        try {
            let search_string = body.search_string;

            let feeds = await feedModel.aggregate([
                { $match:{
                    "searchString": { "$regex": search_string, "$options": "i" }
                }},
                {
                    $project: {
                        _id : 0,
                        title: 1,
                        link: 1,
                        keywords: 1,
                        creator: 1,
                        video_url: 1,
                        description: 1,
                        content: 1,
                        pubDate: 1,
                        image_url: 1,
                        source_id: 1,
                    }
                }
            ]);
            if(!feeds.length) {
                let response = await FeedController.feed(search_string);
                feeds = response.data.results;
                if(feeds.length)
                {
                    FeedController.saveFeedsInDatabase(feeds,search_string);
                }
            }
            return Promise.resolve({status:200,data:feeds});
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async feed(search_string) {
        try {
            const searchString = encodeURIComponent(search_string);
            const response =  await axios.get('https://newsdata.io/api/1/news?apikey='+process.env.API_KEY+'&q='+searchString+'&language=en');
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static saveFeedsInDatabase(data,search_string) {
        data.forEach(async(element) => {
            let data = {
                ...element,
                searchString:search_string
            };
            let feed = new feedModel(data);
            await feed.save();
        });
    }
}

module.exports = FeedController