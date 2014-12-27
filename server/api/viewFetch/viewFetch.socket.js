/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ViewFetch = require('./viewFetch.model');

exports.register = function(socket) {
  ViewFetch.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ViewFetch.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('viewFetch:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('viewFetch:remove', doc);
}