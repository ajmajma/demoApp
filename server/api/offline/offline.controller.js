'use strict';

var _ = require('lodash');
var Offline = require('./offline.model');

// Get list of offlines
exports.index = function(req, res) {
  Offline.find(function (err, offlines) {
    if(err) { return handleError(res, err); }
    return res.json(200, offlines);
  });
};

// Get a single offline
exports.show = function(req, res) {
  Offline.findById(req.params.id, function (err, offline) {
    if(err) { return handleError(res, err); }
    if(!offline) { return res.send(404); }
    return res.json(offline);
  });
};

// Creates a new offline in the DB.
exports.create = function(req, res) {
  Offline.create(req.body, function(err, offline) {
    if(err) { return handleError(res, err); }
    return res.json(201, offline);
  });
};

// Updates an existing offline in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Offline.findById(req.params.id, function (err, offline) {
    if (err) { return handleError(res, err); }
    if(!offline) { return res.send(404); }
    var updated = _.merge(offline, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, offline);
    });
  });
};

// Deletes a offline from the DB.
exports.destroy = function(req, res) {
  Offline.findById(req.params.id, function (err, offline) {
    if(err) { return handleError(res, err); }
    if(!offline) { return res.send(404); }
    offline.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}