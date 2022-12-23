import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError{
    statusCode = 400;

    constructor(private errors: string){
       super();
       Object.setPrototypeOf(this, BadRequestError.prototype) 
    }

    serializeErrors() {
        return [{message: this.errors}]
    }
}