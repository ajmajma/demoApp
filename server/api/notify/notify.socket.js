/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Notify = require('./notify.model');

exports.register = function(socket) {
  Notify.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Notify.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('notify:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('notify:remove', doc);
}