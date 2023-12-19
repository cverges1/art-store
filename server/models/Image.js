const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  encoding: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = model('Image', imageSchema);

module.exports = Image;
