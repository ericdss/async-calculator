import { Response } from "express";

export default class BaseController{
    customResponse(res: Response, statusCode: number, data: unknown): Response {
        
        if(!data) data = {};

        const body = {
            data: data,
            erros: []
        };

        return res.status(statusCode).json(body);
    }
}