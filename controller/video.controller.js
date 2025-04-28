const ApiError = require("../utils/ApiError");
const Video = require("../models/video.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const getVideos = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const videos = await Video.find({})
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return res.status(200).json(new ApiResponse(true, videos, "Videos fetched successfully"));
})


// GET /videos/search?q=query - search
const searchVideos = asyncHandler(async (req, res) => {
    const q = req.query.q;
    if (!q) throw new ApiError(400, "Query parameter `q` is required");

    const videos = await Video.find({
        $or: [
            { title: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } }
        ]
    }).sort({ publishedAt: -1 });

    res.status(200).json(new ApiResponse(true, videos, "Videos fetched successfully"));
})
module.exports = { getVideos,searchVideos };