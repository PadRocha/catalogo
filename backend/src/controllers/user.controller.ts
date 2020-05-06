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
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!userStored) return res.status(204).send({ message: 'Saved and is not returning any content' });
        delete userStored.password;
        return res.status(200).send({ token: createToken(userStored) });
    });
}

export function loginUser(req: Request, res: Response) {
    if (!req.body) return res.status(400).send({ message: 'Client has not sent params' });
    const userData = req.body;
    User.findOne({ nickname: userData.nickname }, (err, user: IUser) => {
        if (err) return res.status(409).send({ message: 'Internal error, probably error with params' });
        if (!user) return res.status(404).send({ message: 'Document not found' });
        if (!user.comparePassword(userData.password)) return res.status(401).send({ message: 'Unauthorized' });
        else {
            delete user.password;
            return res.status(200).send({ token: createToken(user) });
        }
    });
}

export function returnUser(req: Request | any, res: Response) {
    if (!req.user) return res.status(400).send({ message: 'User failed to pass authentication' });
    return res.status(200).send({ identifier: req.user.sub, nickname: req.user.nickname, role: req.user.role });
}