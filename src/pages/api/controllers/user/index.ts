import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import sequelize from 'sequelize';
import jwt from 'jsonwebtoken';

import db from '../../database';


type User = {
    id: string;
    name: string;
    username: string;
    password?: string;
}

type Data = {
    user?: User;
    error?: Error;
    message?: string;
}

type UserRequestRegister = {
    name: string;
    user: string;
    password: string;
}


async function getUserByUsername(username: string): Promise<User | null> {
    return await db.query<User>(`SELECT * FROM users WHERE username = '${username}'`,
        { type: sequelize.QueryTypes.SELECT })
        .then((user) => {
            if (user) {
                return user[0];
            } else {
                return null;
            }
        })
        .catch((err: any) => {
            throw new Error(err.message)
        });
}

// authenticated method, should be another router and validate by some middleware
async function getUserById(req: NextApiRequest): Promise<User> {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        let err = new Error('Toke not found!');
        err.name = 'token';
        throw err;
    }
    const [, token] = authHeader.split(' ');
    let userID = 0;

    try {
        const secret = process.env.SECRETPASS || 'S3CR3T3'

        await jwt.verify(token, secret, (err, decoded: any) => {
            userID = decoded.id;
        });
    } catch {
        let err = new Error('Invalid Token');
        err.name = 'token';
        throw err;
    }

    if (userID === 0) {
        let err = new Error('Invalid Token');
        err.name = 'token';
        throw err;
    }

    return await db.query<User>(`SELECT * FROM users WHERE id = ${userID}`,
        { type: sequelize.QueryTypes.SELECT }).then((user) => {
            if (user && user.length > 0) {
                delete user[0].password;
                return user[0];
            } else {
                throw new Error('User NotFound!');
            }
        });

}

async function register(userRequestRegister: UserRequestRegister) {
    try {
        const userExists = await getUserByUsername(userRequestRegister.user);
        if (userExists) {
            throw new Error('User already exist');
        } else {
            const hashedPass = await bcrypt.hash(userRequestRegister.password, 8);
            const inserted = await db.query(`insert into users (name, username, password) values ('${userRequestRegister.name}', '${userRequestRegister.user}', '${hashedPass}')`, { type: sequelize.QueryTypes.INSERT });
            return inserted;
        }
    } catch (err: any) {
        return err;
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const httpMethod = req.method;

    try {
        if (httpMethod === 'POST') {
            const response = await register(req.body);
            if (response && response.message)
                res.status(500).json({ message: response.message });
            else
                res.status(200).json(response);
        } else if (httpMethod === 'GET') {
            const response = await getUserById(req);
            if (response) {
                res.status(200).json({ user: response });
            }
            else
                res.status(500).json({ message: 'User not found' });
        }
    } catch (err: any) {
        if (err && err.name === 'token') {
            res.status(401).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }

}

