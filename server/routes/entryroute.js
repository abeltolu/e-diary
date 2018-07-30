import Router from 'express';
import EntryController from '../controllers/EntryController';
import Validation from '../helpers/validation';
import verifyToken from '../middleware/verifyToken';

const entryRoute = Router();

// create entry
entryRoute.post('/', verifyToken, Validation.checkEntryInputs, EntryController.createEntry);

// get all entries
entryRoute.get('/', verifyToken, EntryController.getAllEntries);
export default entryRoute;

// get a singke entry
entryRoute.get('/:entryId', verifyToken, EntryController.getSingleEntry);
