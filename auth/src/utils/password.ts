import bcrypt from 'bcrypt';

const saltRound = 10

export class Password{
    static toHash(password: string){
        return new Promise((resolve) => {
            bcrypt.hash(password, saltRound, function(err: Error | undefined, hash: string){
                resolve(hash);
            })
        })
    }

    static compare(storedPassword: string, suppliedPassword: string){
        return new Promise((resolve, reject) => {
            bcrypt.compare(suppliedPassword, storedPassword, function(err: Error | undefined, result : boolean | void){
                resolve(result);
            })
        })
    }
}