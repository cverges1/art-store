//importing our mongoose connection
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

//invoke our connection
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cv-art-store',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const connection = mongoose.connection;
const gridConnect = new GridFSBucket(connection, {
    bucketName: 'Image',
});

module.exports = { connection, gridConnect };