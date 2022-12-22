import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';

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
        throw new Error('Invalid email or password')
    }
    const {email, password} = req.body;
    throw new Error('No database')
    res.send({});
});

export {router as signupRouter}