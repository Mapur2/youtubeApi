const express = require('express');
require('dotenv').config();
const videoRoutes = require('./routers/video.router');
const { startBackgroundJob } = require('./services/videoGather');
const connectDB = require('./db/connect');

const app = express();
const PORT = 3000;
app.use(express.static('public'));
app.use(express.json());
app.use('/api/videos', videoRoutes);

connectDB().then(() => {
    startBackgroundJob();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch(err => {
        console.log("Could not start server: ", err);
    })
