import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import sequelize from 'sequelize';
import bcrypt from 'bcryptjs';

import db from '../../database';

type Data = {
    name?: string,
    access_token?: string,
    error?: boolean,
    message?: string
}

type AuthRequest = {
    user: string;
    password: string;
}

async function auth(authRequest: AuthRequest): Promise<Data | Error> {
    try {
        return await db.query(`SELECT * FROM users WHERE username='${authRequest.user}'`, {
            type: sequelize.QueryTypes.SELECT
        }).then(async (result: any) => {

            if (!result || result.length === 0) {
                throw new Error("User not found")
            }

            if (!await bcrypt.compare(authRequest.password, result[0].password)) {
                throw new Error("Password does not match")
            }

            const { id, name } = result[0];
            const secret = process.env.SECRETPASS || 'S3CR3T3'
            return {
                access_token: jwt.sign({ id, name }, secret, { expiresIn: process.env.EXPIRESIN }) //
            }
        });
    }
    catch (err: any) {
        return err;
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const httpMethod = req.method;

    if (httpMethod === 'POST') {
        const response = await auth(req.body);
        if (response && response.message) {
            res.status(500).json({ error: true, message: response.message });
        } else {
            res.status(200).json(response);
        }
    }
}
