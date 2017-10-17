'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('./v1/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  v1: {
    users: _users2.default
  }
};