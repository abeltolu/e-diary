import express from 'express';
import logger from 'volleyball';
import dotenv from 'dotenv';
import authRoute from './server/routes/authroute';
import entryRoute from './server/routes/entryroute';

dotenv.config();

const app = express();

const port = process.env.PORT || 7000;

// log requests out
app.use(logger);

// request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// welcome route
app.get('/', (request, response) => response.status(200).json({
  status: 'success',
  message: 'Welcome to e-diary, jot down your thoughts',
}));

// Authentication route
app.use('/api/v1/auth', authRoute);
// Entry Route
app.use('/api/v1/users/entries', entryRoute);

// connect
app.listen(port, () => {
  // eslint-disable-next-line
    console.log(`e-diary is listening on port ${port}`);
});

export default app;
