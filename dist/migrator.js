/*
  This is built to convert the old database into a
  more modern ORM structure, as well as to add support
  for multiple payment methods and to salt/hash passwords
  for security means
*/
import async from 'async';
import bcrypt from 'bcryptjs';

import db from './lib/database';

const { User, sequelize } = db;

export default function migrator() {
  console.log('Starting migrator...');

  return new Promise((resolve, reject) => {
    sequelize.query('SELECT * FROM oldusers WHERE 1=1 ORDER BY Number ASC', {
      type: sequelize.QueryTypes.SELECT
    }).then(users => {
      console.log('Pulled old users...');

      for (let x = 0; x < users.length; x++) {
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

      async.eachSeries(users, (user, next) => {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) return reject(err);
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return reject(err);
            user.password = hash;
            console.log('Hashed user: ' + user.id);
            next();
          });
        });
      }, err => {
        if (err) return reject(err);
        console.log('Hashed passwords...');

        User.bulkCreate(users).then(newUsers => resolve()).catch(err => {
          reject(err);
        });
      });
    }).catch(err => reject(err));
  });
}