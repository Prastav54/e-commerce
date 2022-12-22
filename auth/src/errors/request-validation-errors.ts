import {ValidationError} from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(private errors: ValidationError[]){
        super('Invalid Request');

        // As we are extending built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(err => {
            return {message: err.msg, field: err.param}
        })
    }
}