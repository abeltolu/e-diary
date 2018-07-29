import Router from 'express';
import AuthController from '../controllers/AuthController';
import Validation from '../helpers/validation';

const authRoute = Router();

// signup
authRoute.post('/signup', Validation.checkUserInputs, AuthController.signup);

// Login
authRoute.post('/login', AuthController.login);

// get all users
authRoute.get('/', AuthController.getAllUsers);

// get user details
authRoute.get('/:userId', AuthController.getUserDetails);

export default authRoute;
