import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-errors';
import { RequestValidationError } from '../errors/request-validation-errors';

const router = express.Router();

router.post('/api/users/sigup', [
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters Long')
], (req: Request , res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        throw new RequestValidationError(errors.array())
    }
    const {email, password} = req.body;
    throw new DatabaseConnectionError()
    res.send({});
});

export {router as signupRouter}