import request from 'supertest';
import {app} from '../../app';

it ('return success on successful signup',async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'prastav@yopmail.com',
        password: '123456'
    })
    .expect(200)
})

it ('return error on invalid email',async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'prastaddddd',
        password: '123456'
    })
    .expect(400)
})

it ('return error on invalid password',async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'prastav@yopmail.com',
        password: '12'
    })
    .expect(400)
})

it ('return error with missing email and password',async () => {
    return request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400)
})

it ('does not allow same email for signup',async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'prastav@yopmail.com',
        password: '123456'
    })
    .expect(200)

    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'prastav@yopmail.com',
        password: '123456'
    })
    .expect(400)
})

it ('sets a cookie after successful signup', async () => {
    const response = await request(app)
    .post('/api/users/signup')
    .send({
        email: 'prastav@yopmail.com',
        password: '123456'
    })
    .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined();
})
