import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import migrator from './migrator';

import db from './lib/database';
import routes from './lib/routes';

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname + '/../public')));

// Routes
app.use('/v1/users', routes.v1.users);

db.sequelize.authenticate().then(() => {
  return db.sequelize.sync({ force: false });
}).then(() => {
  app.listen((process.env.PORT || 3000), '0.0.0.0', err => {
    if(err) throw err;
    console.log('Server is now running on *:', (process.env.PORT || 3000));
  })
}).catch(err => {
  throw err;
});
