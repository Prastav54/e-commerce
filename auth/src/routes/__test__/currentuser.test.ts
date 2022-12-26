import request from 'supertest';
import {app} from '../../app';

it ('responds details about current user', async () => {
    const cookie = await global.signup();

    const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

    expect(response.body.currentUser.email).toEqual('prastav@yopmail.com')
})

it ('responds null if not authenticated', async () => {
    const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(401);

    expect(response.body.currentUser).toEqual(undefined)
})