/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Offline = require('./offline.model');

exports.register = function(socket) {
  Offline.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Offline.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('offline:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('offline:remove', doc);
}