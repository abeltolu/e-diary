import express from 'express';
import bodyParser from 'body-parser';
import logger from 'volleyball';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

const port = process.env.PORT || 7000;

// log requests out
app.use(logger);

// request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// welcome route
app.get('/', (request, response) => {
 return response.status(200).json({
    status: 'success',
    message: 'Welcome to e-diary, jot down your thoughts' 
 })
});

// connect
app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`e-diary is listening on port ${port}`);
});

export default app;
