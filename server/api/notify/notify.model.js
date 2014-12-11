'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NotifySchema = new Schema({
  content: String,
  type: String,
  active: Boolean
});

module.exports = mongoose.model('Notify', NotifySchema);