'use strict';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const Authorize = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token || token instanceof Array) {
        return res.status(401).send();
    }
    else {
        /* eslint-disable-next-line */
        jwt.verify(token, process.env.SECRET_KEY || "", function (error, decoded) {
            if (error)
                res.status(401).send();
            else
                next();
        });
    }
};

export { Authorize };