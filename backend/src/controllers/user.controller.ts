/*------------------------------------------------------------------*/
// Controlador de user.js
/*------------------------------------------------------------------*/

import { Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';

import User, { IUser } from '../models/user';

import createToken, { Token } from '../services/jwt';

import config from '../config/config';


export function registerUser(req: Request, res: Response) {
    if (!req.body) return res.status(400).send({ message: 'Client has not sent params' });
    const newUser = new User(req.body);
    newUser.save((err, userStored: IUser) => {
        if (err) return res.status(500).send({ message: 'Internal Server message' });
        if (!userStored) return res.status(204).send({ message: 'User No Content' });
        delete userStored.password;
        return res.status(200).send({ token: createToken(userStored) });
    });
}

export function loginUser(req: Request, res: Response) {
    if (!req.body) return res.status(400).send({ message: 'Bad Request' });
    const userData = req.body;
    User.findOne({ nickname: userData.nickname }, (err, user: IUser) => {
        if (err) return res.status(500).send({ message: 'Internal Server message' });
        if (!user) return res.status(404).send({ message: 'User Not Found' });
        if (!user.comparePassword(userData.password)) return res.status(401).send({ message: 'Unauthorized' });
        else {
            delete user.password;
            return res.status(200).send({ token: createToken(user) });
        }
    });
}

export function returnUser(req: Request, res: Response) {
    if (!req.headers.authorization) return res.status(400).send({ message: 'Client has not sent Token' });
    //TODO: Cambiar 403 por 400 en frontend
    const token = req.headers.authorization.replace(/['"]+/g, '').split(' ')[1];
    if (token === 'null') return res.status(403).send({ message: 'Forbidden' });
    try {
        var payload: Token = <Token>verify(token, <Secret>config.KEY.SECRET);
        delete payload.iat;
        delete payload.exp;
        return res.status(200).send({ _id: payload.sub, nickname: payload.nickname, role: payload.role });
    } catch (message) {
        return res.status(409).send({ message: 'The request could not be processed because of conflict in the current state of the resourcess' });
    }
}