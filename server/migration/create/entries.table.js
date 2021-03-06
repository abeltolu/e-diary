import { Pool } from 'pg';
import config from '../../config/config';

const db = new Pool(config.test);
// create entries table
db.query(
  `CREATE TABLE IF NOT EXISTS entries
  (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL,
  image_url VARCHAR(1000), note TEXT NOT NULL,
  user_id integer REFERENCES users (id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW());`,
)
  .then((response) => {
  // eslint-disable-next-line
  console.log(response);
  }).catch((error) => {
  // eslint-disable-next-line
  console.log(error.message);
  });
