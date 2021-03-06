import { Pool } from 'pg';
import config from '../../config/config';

const db = new Pool(config.test);
// delte users table
db.query('DROP TABLE IF EXISTS users CASCADE;')
  .then((response) => {
    // eslint-disable-next-line
    console.log(response);
  }).catch((error) => {
    // eslint-disable-next-line
    console.log(error.message);
  });
