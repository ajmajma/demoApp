'use strict';

var _ = require('lodash');
var Alerts = require('./alerts.model');

// Get list of alertss
exports.index = function(req, res) {
  Alerts.find(function (err, alertss) {
    if(err) { return handleError(res, err); }
    return res.json(200, alertss);
  });
};

// Get a single alerts
exports.show = function(req, res) {
  Alerts.findById(req.params.id, function (err, alerts) {
    if(err) { return handleError(res, err); }
    if(!alerts) { return res.send(404); }
    return res.json(alerts);
  });
};

// Creates a new alerts in the DB.
exports.create = function(req, res) {
  Alerts.create(req.body, function(err, alerts) {
    if(err) { return handleError(res, err); }
    return res.json(201, alerts);
  });
};

// Updates an existing alerts in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Alerts.findById(req.params.id, function (err, alerts) {
    if (err) { return handleError(res, err); }
    if(!alerts) { return res.send(404); }
    var updated = _.merge(alerts, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, alerts);
    });
  });
};

// Deletes a alerts from the DB.
exports.destroy = function(req, res) {
  Alerts.findById(req.params.id, function (err, alerts) {
    if(err) { return handleError(res, err); }
    if(!alerts) { return res.send(404); }
    alerts.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}