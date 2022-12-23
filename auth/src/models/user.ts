import mongoose from "mongoose";
import { Password } from "../utils/password";

interface UserAtrs {
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<any> {
    addUser(attrs: UserAtrs): UserDoc
}

interface UserDoc extends mongoose.Document {
    email: string,
    password: string,
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save',async function(done){
    if (this.isModified('password')){
        const hash =await Password.toHash(this.get('password'));
        this.set('password', hash)
    }
    done()
})

userSchema.statics.addUser  = (attrs: UserAtrs) => {
    return new User(attrs)
} 

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };