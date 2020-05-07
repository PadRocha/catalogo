import { model, Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

import config from '../config/config';

export interface IUser extends Document {
    nickname: string,
    password: string,
    role: string,
    comparePassword: Function
}

const userSchema = new Schema({
    nickname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        default: 'user',
        required: true
    }
});

/*------------------------------------------------------------------*/

userSchema.pre<IUser>('save', async function (next: Function) {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcryptjs.genSalt(config.KEY.SALT);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
});


userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcryptjs.compareSync(password, this.password);
};

/*------------------------------------------------------------------*/

export default model<IUser>('User', userSchema);