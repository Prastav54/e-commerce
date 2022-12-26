import request from 'supertest';
import {app} from '../../app';

it ('clears cookie after sign out',async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'prastav@yopmail.com',
        password: '123456'
    })
    .expect(200)

    const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200)

    expect(response.get('Set-Cookie')[0]).toEqual(
        'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    )
})