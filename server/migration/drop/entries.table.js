import { Pool } from 'pg';
import config from '../../config/config';

const db = new Pool(config.test);
// delete entries table
db.query('DROP TABLE IF EXISTS entries CASCADE;')
  .then((response) => {
    // eslint-disable-next-line
    console.log(response);
  }).catch((error) => {
    console.log(error.message);
  });
