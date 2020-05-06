import { Secret, sign } from 'jsonwebtoken';
import moment from 'moment';

import { IUser } from '../models/user'

import config from '../config/config';

export interface Token {
    sub: string,
    nickname: string,
    role: string,
    iat: number,
    exp: number
}

export default function createToken(user: IUser) {
    var payload: Token = {
        sub: user.identifier,
        nickname: user.nickname,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };
    return sign(payload, <Secret>config.KEY.SECRET);
}