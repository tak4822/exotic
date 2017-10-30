const mongoose = require('mongoose');

const typoSchema = mongoose.Schema({
  title: {type: String},
  category: {type: String},
  description: {type: String},
  clients: [{type: String}],
  thumb: {type: String},
  images: [{type: String}],
  files:[{type: String}]
});

module.exports = mongoose.model('Typo', typoSchema);
