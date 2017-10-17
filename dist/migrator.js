'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = migrator;

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _database = require('./lib/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _database2.default.User,
    sequelize = _database2.default.sequelize; /*
                                                This is built to convert the old database into a
                                                more modern ORM structure, as well as to add support
                                                for multiple payment methods and to salt/hash passwords
                                                for security means
                                              */

function migrator() {
  console.log('Starting migrator...');

  return new Promise(function (resolve, reject) {
    sequelize.query('SELECT * FROM oldusers WHERE 1=1 ORDER BY Number ASC', {
      type: sequelize.QueryTypes.SELECT
    }).then(function (users) {
      console.log('Pulled old users...');

      for (var x = 0; x < users.length; x++) {
        users[x] = {
          id: users[x].number,
          gender: users[x].gender,
          nameSet: users[x].nameset,
          title: users[x].title,
          givenName: users[x].givenname,
          middleInitial: users[x].middleinitial,
          surname: users[x].surname,
          streetAddress: users[x].streetaddress,
          city: users[x].city,
          state: users[x].State,
          stateFull: users[x].StateFull,
          zipCode: users[x].ZipCode,
          country: users[x].Country,
          countyFull: users[x].CountryFull,
          email: users[x].EmailAddress,
          username: users[x].username,
          password: users[x].Password,
          browserUserAgent: users[x].BrowserUserAgent,
          telephoneNumber: users[x].TelephoneNumber,
          telephoneCountryCode: users[x].TelephoneCountryCode,
          mothersMaiden: users[x].MothersMaiden,
          birthday: users[x].Birthday,
          age: users[x].age,
          ccType: users[x].CCType,
          ccNumber: users[x].CCNumber,
          cvv2: users[x].CVV2,
          ccExpiry: users[x].CCExpires,
          nationalID: users[x].NationalID,
          ups: users[x].UPS,
          westernUnionMTCN: users[x].WesternUnionMTCN,
          moneyGramMTCN: users[x].MoneyGramMTCN,
          color: users[x].Color,
          company: users[x].Company,
          occupation: users[x].Occupation,
          vehicle: users[x].Vehicle,
          domain: users[x].Domain,
          guid: users[x].GUID,
          latitude: users[x].Latitude,
          longitude: users[x].Longitude
        };
      }

      console.log('Reformatted users...');

      _async2.default.eachSeries(users, function (user, next) {
        _bcryptjs2.default.genSalt(10, function (err, salt) {
          if (err) return reject(err);
          _bcryptjs2.default.hash(user.password, salt, function (err, hash) {
            if (err) return reject(err);
            user.password = hash;
            console.log('Hashed user: ' + user.id);
            next();
          });
        });
      }, function (err) {
        if (err) return reject(err);
        console.log('Hashed passwords...');

        User.bulkCreate(users).then(function (newUsers) {
          return resolve();
        }).catch(function (err) {
          reject(err);
        });
      });
    }).catch(function (err) {
      return reject(err);
    });
  });
}