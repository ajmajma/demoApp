'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OfflineSchema = new Schema({

  	  size : String,
      name : String,
      space : Number,
      launch :  Boolean,
      share : Boolean,
      mobile :  Boolean,
      native :  Boolean,
      flipAction : String,
      actions : Array,
      sides : [{title :  String, content: 'string', sideIs :  String, active : Boolean}],
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Offline', OfflineSchema);