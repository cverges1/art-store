const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, process.env.SECRET, {
        maxAge: process.env.EXPIRATION,
      });
      req.user = data;
    } catch {
      console.log('Invalid token');
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