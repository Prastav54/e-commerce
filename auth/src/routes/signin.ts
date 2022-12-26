import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signin',[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('Must supply password'),
    validateRequest,
] ,(req: Request , res: Response) => {
});

export { router as signinRouter };
