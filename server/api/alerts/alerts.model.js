'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AlertsSchema = new Schema({
  widget: {
  	  size : String,
      title : String,
      content : String,
      help : String,
      launch :  Boolean,
      share : Boolean,
      mobile :  Boolean,
      space : Number
  },
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Alerts', AlertsSchema);