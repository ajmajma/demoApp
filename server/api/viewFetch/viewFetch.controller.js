'use strict';

var _ = require('lodash');
var ViewFetch = require('./viewFetch.model');

// Get list of viewFetchs
exports.index = function(req, res) {
  ViewFetch.find(function (err, viewFetchs) {
    if(err) { return handleError(res, err); }
    return res.json(200, viewFetchs);
  });
};

// Get a single viewFetch
exports.show = function(req, res) {
  ViewFetch.findById(req.params.id, function (err, viewFetch) {
    if(err) { return handleError(res, err); }
    if(!viewFetch) { return res.send(404); }
    return res.json(viewFetch);
  });
};

// Creates a new viewFetch in the DB.
exports.create = function(req, res) {
  ViewFetch.create(req.body, function(err, viewFetch) {
    if(err) { return handleError(res, err); }
    return res.json(201, viewFetch);
  });
};

// Updates an existing viewFetch in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ViewFetch.findById(req.params.id, function (err, viewFetch) {
    if (err) { return handleError(res, err); }
    if(!viewFetch) { return res.send(404); }
    var updated = _.merge(viewFetch, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, viewFetch);
    });
  });
};

// Deletes a viewFetch from the DB.
exports.destroy = function(req, res) {
  ViewFetch.findById(req.params.id, function (err, viewFetch) {
    if(err) { return handleError(res, err); }
    if(!viewFetch) { return res.send(404); }
    viewFetch.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}