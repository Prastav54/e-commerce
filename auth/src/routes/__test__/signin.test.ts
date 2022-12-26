import request from 'supertest';
import {app} from '../../app';

it ('fails when email does not exists',async () => {
    return request(app)
    .post('/api/users/signin')
    .send({
        email: 'prastav@yopmail.com',
        password: '123456'
    })
    .expect(400)
})

it ('fails if incorrect password',async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'prastav@yopmail.com',
        password: '123456'
    })
    .expect(200)

    return request(app)
    .post('/api/users/signin')
    .send({
        email: 'prastav@yopmail.com',
        password: '12345'
    })
    .expect(400)
})

it ('respond cookie for valid credentials',async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'prastav@yopmail.com',
        password: '123456'
    })
    .expect(200)

    const response = await request(app)
    .post('/api/users/signin')
    .send({
        email: 'prastav@yopmail.com',
        password: '123456'
    })
    .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined();
})