import { Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import moment from 'moment';

import User from '../models/user';

import { Token } from '../services/jwt';

import config from '../config/config';

export async function authorized(req: Request | any, res: Response, next: Function) {
    if (!req.headers.authorization) return res.status(403).send({ message: 'Forbidden' });

    const token = req.headers.authorization.replace(/['"]+/g, '').split(' ')[1];

    if (token === 'null') return res.status(403).send({ message: 'Forbidden' });

    try {
        var payload: Token = <Token>verify(token, <Secret>config.KEY.SECRET);
        const user: any = await User.findById(payload.sub);

        if (
            !user ||
            user.nickname !== payload.nickname ||
            payload.exp <= moment().unix()
        ) return res.status(423).send({ message: 'The resource that is being accessed is locked' });
        // if (payload.exp <= moment().unix()) return res.status(423).send({ message: 'The resource that is being accessed is locked' });
    } catch (message) {
        return res.status(409).send({ message: 'Indicates that Internal error, probably error with paramsss' });
    }

    delete payload.iat;
    delete payload.exp;

    req.user = payload;

    return next();
}

export async function authAdmin(req: Request | any, res: Response, next: Function) {
    if (!req.headers.authorization) return res.status(403).send({ message: 'Forbidden' });

    const token = req.headers.authorization.replace(/['"]+/g, '').split(' ')[1];

    if (token === 'null') return res.status(403).send({ message: 'Forbidden' });

    try {
        var payload: Token = <Token>verify(token, <Secret>config.KEY.SECRET);
        const user: any = await User.findById(payload.sub);

        if (
            !user ||
            user.nickname !== payload.nickname ||
            payload.role !== 'admin' || user.role !== 'admin' ||
            payload.exp <= moment().unix()
        ) return res.status(423).send({ message: 'The resource that is being accessed is locked' });
        // if (payload.role !== 'admin' && user.role !== 'admin') return res.status(423).send({ message: 'The resource that is being accessed is locked' });
        // if (payload.exp <= moment().unix()) return res.status(423).send({ message: 'The resource that is being accessed is locked' });
    } catch (message) {
        return res.status(409).send({ message: 'Indicates that Internal error, probably error with paramsss' });
    }

    delete payload.iat;
    delete payload.exp;

    req.user = payload;

    return next();
}
