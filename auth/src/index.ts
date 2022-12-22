import express from 'express';
import {json} from 'body-parser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHHandler } from './middlewares/err-handler';

const app = express();
app.use(json());

app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHHandler);

app.listen(3000, () => {
    console.log('Listening to port 3000!')
})