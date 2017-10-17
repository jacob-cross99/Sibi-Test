'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _migrator = require('./migrator');

var _migrator2 = _interopRequireDefault(_migrator);

var _database = require('./lib/database');

var _database2 = _interopRequireDefault(_database);

var _routes = require('./lib/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use(_express2.default.static(_path2.default.resolve(__dirname + '/../public')));

// Routes
app.use('/v1/users', _routes2.default.v1.users);

_database2.default.sequelize.authenticate().then(function () {
  return _database2.default.sequelize.sync({ force: false });
}).then(function () {
  app.listen(process.env.PORT || 3000, '0.0.0.0', function (err) {
    if (err) throw err;
    console.log('Server is now running on *:', process.env.PORT || 3000);
  });
}).catch(function (err) {
  throw err;
});