import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../errors/custom-error'

export const errorHHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError){
        res.status(err.statusCode).send({errors: err.serializeErrors()})
    }
    res.status(500).send({message: err.message})
}