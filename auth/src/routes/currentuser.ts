import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req , res) => {
    if (!req.session?.jwt){
        return res.status(400).send({currentUser: null})
    }
    try {
        const payload = jwt.verify(
            req.session.jwt,
            process.env.JWT_KEY!
        )
        res.status(200).send({currentUser: payload})
    } catch (error) {
        return res.status(400).send({currentUser: null})
    }
});

export {router as currentUserRouter}