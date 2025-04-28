const axios = require('axios');
const Video = require('../models/video.model');
require('dotenv').config();

const YOUTUBE_API = process.env.YOUTUBE_API;
const SEARCH_QUERY = process.env.SEARCH_QUERY;

async function fetchAndStoreVideos() {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: SEARCH_QUERY,
        type: 'video',
        order: 'date',
        maxResults: 10,
        key: YOUTUBE_API
      }
    });

    const videos = response.data.items;

    for (const video of videos) {
      const { videoId } = video.id;
      const { title, description, publishedAt, thumbnails, channelTitle } = video.snippet;
      await Video.updateOne(
        { videoId },
        {
          $setOnInsert: {
            videoId,
            title,
            description,
            publishedAt,
            thumbnails: {
              default: thumbnails.default.url,
              medium: thumbnails.medium.url,
              high: thumbnails.high.url
            },
            channelTitle
          }
        },
        { upsert: true }
      );
    }
  } catch (error) {
    console.error("Error fetching videos:", error.message);
  }
}

function startBackgroundJob() {
  setInterval(fetchAndStoreVideos, 10 * 1000); 
}

module.exports = {
  startBackgroundJob
};
