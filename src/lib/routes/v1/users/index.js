import { Router } from 'express';

import { SIBI } from '../../../config';
import db from '../../../database';

const router = Router();
const { User } = db;

router.route('/')
  .get((req, res) => {
    let { first_name, last_name, page } = req.query;

    let query = {};

    if(isNaN(page)) page = 0;
    if(first_name !== undefined) query.givenName = { like: '%' + first_name + '%' };
    if(last_name !== undefined) query.surname = { like: '%' + last_name + '%' };

    User.findAll({
      where: query,
      attributes: ['id', 'givenName', 'surname', 'username', 'age', 'gender'],
      limit: SIBI.userPaging,
      offset: SIBI.userPaging * page
    }).then(users => {
      for(let x = 0; x < users.length; x++)
        users[x] = users[x].get({ plain: true });

      res.json({ users });
    }).catch(err => {
      res.json({ error: 1, message: 'An error has occured within the database, please try again later or contact support' });
    });
  });

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;

    if(isNaN(id)) return res.json({ error: 1, message: 'You must specify a user ID to query by' });

    User.findOne({
      where: {
        id
      }
    }).then(user => {
      res.json({ user: user.get({ plain: true }) });
    }).catch(err => {
      res.json({ error: 1, message: 'An error has occured within the database, please try again later or contact support' });
    });
  });

export default router;