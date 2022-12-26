import mongoose from 'mongoose';
import {app} from './app';

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