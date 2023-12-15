const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  authMiddleware: async function ({ req }) {
    if (!req || !req.headers) {
      return req;
    }
    
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return next();
    }

    try {
      const { data } = jwt.verify(token, process.env.SECRET, {
        maxAge: process.env.EXPIRATION,
      });
      req.user = data;
      
      // Connect to MongoDB and initialize gridConnect
      await client.connect();
      const db = client.db('cv-art-store');
      req.context = {
        gridConnect: new GridFSBucket(db, {
          bucketName: 'artworkImages',
        }),
      };
    } catch {
      console.log('Invalid token');
    }finally {
      // Close the MongoDB connection when done
      await client.close();
    }

    return req;
  },
  signToken: function ({ firstName, lastName, email, _id }) {
    const payload = { firstName, lastName, email, _id };

    return jwt.sign({ data: payload }, process.env.SECRET, {
      expiresIn: '2h',
    });
  },
};