import { Pool } from 'pg';
import config from './config';

// const env = process.env.NODE_ENV;
const db = new Pool(config.test);
// let db;
// if (env === 'test') {
//   db = new Pool(config.test);
// } else {
//   db = new Pool(config.development);
// }
console.log(config.test);
// connect pg
db.connect().then(() => {
  // eslint-disable-next-line
  console.log('database connection is successful');
}).catch((error) => {
  // eslint-disable-next-line
  console.log(error.message);
});

export default db;
