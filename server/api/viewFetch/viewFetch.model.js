'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ViewFetchSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('ViewFetch', ViewFetchSchema);