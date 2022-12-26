import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHHandler } from './middlewares/err-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true)
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
)

app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', () => {
    throw new NotFoundError();
})
app.use(errorHHandler);

const start = async () => {
    if (!process.env.JWT_KEY){
        throw new Error('Secret ket for JWT should be defined')
    }
    try {  
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('Connected to mongo')
    } catch (error) {
        console.log(error);
    }

    app.listen(3000, () => {
        console.log('Listening to port 3000!')
    })
}

start();