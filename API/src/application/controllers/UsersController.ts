import { Request, Response } from "express";
import BaseController from "./BaseController";
import IUserService from "../../domain/interfaces/services/IUserService";

class UsersController extends BaseController
{
    private readonly _usersService: IUserService;

    constructor(usersService: IUserService){
        super();
        this._usersService = usersService;
    }

    register = async (req: Request, res: Response): Promise<Response> => 
    {
        try {
            const user = await this._usersService.register(req.body);

            if(!user){
                return res.status(400).send();
            }
            
            return res.status(200).send(user);
        }
        catch (error) {
            return res.status(500).json({message: "An unexpected error has occurred"});
        }
    }

    login = async (req: Request, res: Response): Promise<Response> => 
    {
        try {
            let tokenInfo = await this._usersService.login(req.body);
    
            if (!tokenInfo){
                return res.status(401).send();
            }
    
            return this.customResponse(res, 200, tokenInfo);
        }
        catch (error) {
            return res.status(500).json({message: "An unexpected error has occurred"});
        }
    }
}

export { UsersController };