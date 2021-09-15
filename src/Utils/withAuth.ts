
import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';

type DecodeToken = {
    id: string;
    exp: number
}

export function withAuth(fn: any) {
    return async (ctx: any) => {
        try {
            const cookies = parseCookies(ctx);
            const token = cookies['authority.token'];

            if (!token) {
                ctx.res.statusCode = 302;
                ctx.res.setHeader('Location', '/');
                return { props: {} };
            }

            return await fn(ctx);
        } catch (err) {
            ctx.res.statusCode = 302;
            ctx.res.setHeader('Location', '/');
            return { props: {} };
        }
    }
}