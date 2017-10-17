import fs from 'fs';
import path from 'path';

import Sequelize from 'sequelize';

import { DATABASE } from '../config';

const sequelize = new Sequelize(DATABASE.uri, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: data => {
    if (DATABASE.enableLogs === true) console.log(data);
  }
});

let db = {};

fs.readdirSync(__dirname).filter(file => {
  return file.indexOf('.') !== 0 && file !== 'index.js';
}).forEach(file => {
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;