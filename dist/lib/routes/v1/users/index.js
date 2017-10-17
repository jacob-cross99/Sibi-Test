'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _config = require('../../../config');

var _database = require('../../../database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
var User = _database2.default.User;


router.route('/').get(function (req, res) {
  var _req$query = req.query,
      first_name = _req$query.first_name,
      last_name = _req$query.last_name,
      page = _req$query.page;


  var query = {};

  if (isNaN(page)) page = 0;
  if (first_name !== undefined) query.givenName = { like: '%' + first_name + '%' };
  if (last_name !== undefined) query.surname = { like: '%' + last_name + '%' };

  User.findAll({
    where: query,
    attributes: ['id', 'givenName', 'surname', 'username', 'age', 'gender'],
    limit: _config.SIBI.userPaging,
    offset: _config.SIBI.userPaging * page
  }).then(function (users) {
    for (var x = 0; x < users.length; x++) {
      users[x] = users[x].get({ plain: true });
    }res.json({ users: users });
  }).catch(function (err) {
    res.json({ error: 1, message: 'An error has occured within the database, please try again later or contact support' });
  });
});

router.route('/:id').get(function (req, res) {
  var id = req.params.id;


  if (isNaN(id)) return res.json({ error: 1, message: 'You must specify a user ID to query by' });

  User.findOne({
    where: {
      id: id
    }
  }).then(function (user) {
    res.json({ user: user.get({ plain: true }) });
  }).catch(function (err) {
    res.json({ error: 1, message: 'An error has occured within the database, please try again later or contact support' });
  });
});

exports.default = router;