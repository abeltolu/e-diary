import Router from 'express';
import EntryController from '../controllers/EntryController';
import Validation from '../helpers/validation';
import verifyToken from '../middleware/verifyToken';

const entryRoute = Router();

// create entry
entryRoute.post('/', verifyToken, Validation.checkEntryInputs, EntryController.createEntry);

export default entryRoute;
