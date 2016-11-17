var db = require('../db.js');

exports.create = function(user, password_hash, cb) {
    var values = [user, password_hash];

    db.get().query('INSERT INTO node_users (user, password) VALUES(?, ?)', values, function(err, result) {
        if(err) return cb(err);
        cb(null, result.insertId);
    });
}

exports.delete = function(id, cb) {
  db.get().query('DELETE FROM node_users WHERE id=?', [id], function(err, result) {
    if(err) return cb(err);
    cb(null, result);
  });
}

exports.findById = function(id, cb) {
  db.get().query('SELECT * FROM node_users WHERE id=?', [id], function(err, user) {
    if(err) return cb(err);
    cb(null, user);
  });
}

exports.getAll = function(cb) {
    db.get().query('SELECT * FROM node_users', function(err, rows) {
        if(err) return cb(err);
        cb(null, rows);
    });
}
