/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Alerts = require('./alerts.model');

exports.register = function(socket) {
  Alerts.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Alerts.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('alerts:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('alerts:remove', doc);
}