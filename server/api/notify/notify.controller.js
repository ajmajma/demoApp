'use strict';

var _ = require('lodash');
var Notify = require('./notify.model');

// Get list of notifys
exports.index = function(req, res) {
  Notify.find(function (err, notifys) {
    if(err) { return handleError(res, err); }
    return res.json(200, notifys);
  });
};

// Get a single notify
exports.show = function(req, res) {
  Notify.findById(req.params.id, function (err, notify) {
    if(err) { return handleError(res, err); }
    if(!notify) { return res.send(404); }
    return res.json(notify);
  });
};

// Creates a new notify in the DB.
exports.create = function(req, res) {
  Notify.create(req.body, function(err, notify) {
    if(err) { return handleError(res, err); }
    return res.json(201, notify);
  });
};

// Updates an existing notify in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Notify.findById(req.params.id, function (err, notify) {
    if (err) { return handleError(res, err); }
    if(!notify) { return res.send(404); }
    var updated = _.merge(notify, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, notify);
    });
  });
};

// Deletes a notify from the DB.
exports.destroy = function(req, res) {
  Notify.findById(req.params.id, function (err, notify) {
    if(err) { return handleError(res, err); }
    if(!notify) { return res.send(404); }
    notify.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}