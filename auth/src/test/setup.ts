import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {app} from '../app';
import request from 'supertest';

declare global {
    function signup(): Promise<string[]>
}

let mongo : any;

beforeAll(async () => {
    process.env.JWT_KEY = 'hellotest';
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri)
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})

global.signup = async () => {
    const email = 'prastav@yopmail.com';
    const password = '123456';

    const response = await request(app)
    .post('/api/users/signup')
    .send({
        email,
        password
    })
    .expect(200)

    const cookie = response.get('Set-Cookie');
    return cookie;
}