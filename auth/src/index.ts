import express from 'express';
import {json} from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/currentUser', (req, res) => {
    res.send("Hello")
})

app.listen(3000, () => {
    console.log('Listening to port 3000!')
})