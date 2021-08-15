import { Response } from "express";
import mongoose from 'mongoose';

export default abstract class BaseController{
    protected customResponse(res: Response, statusCode: number, data: unknown): Response {
        
        if(!data) data = {};

        const body = {
            data: data,
            errors: []
        };

        return res.status(statusCode).json(body);
    }

    protected validateObjectId = async (_id: string): Promise<mongoose.Types.ObjectId | null> =>
    {
        try {
            if(!mongoose.Types.ObjectId.isValid(_id))
            {
                return null;
            }
            else
            {
                return mongoose.Types.ObjectId(_id);
            }              
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}