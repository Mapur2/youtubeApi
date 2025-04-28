const express = require('express');
const Video = require('../models/video.model');
const { searchVideos, getVideos } = require('../controller/video.controller');
const router = express.Router();

router.route('/').get(getVideos);
router.route('/search').get(searchVideos);
module.exports = router;
