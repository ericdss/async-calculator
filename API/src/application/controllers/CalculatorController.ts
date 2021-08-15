import { Request, Response } from "express";
import ICalculatorService from "../../domain/interfaces/services/ICalculatorService";
import BaseController from "./BaseController";

export class CalculatorController extends BaseController{
    private readonly _calculatorService: ICalculatorService;

    constructor(calculatorService: ICalculatorService){
        super();
        this._calculatorService = calculatorService;
    }

    sum = async (req: Request, res: Response): Promise<Response> =>{
        try {
            const result = await this._calculatorService.createSum(req.body);  

            if(!result)
                return res.status(400).json("Error while processing request. Please try again");
            
            return res.status(201).json(result);

        }
        catch (error) {
            return res.status(500).json({message: "An unexpected error has occurred"});
        }
    }

    getResult = async (req: Request, res: Response): Promise<Response> =>{
        try {
            const id = await this.validateObjectId(req.params.id);

            if(!id)
            {
                return res.status(404).send();
            }

            const result = await this._calculatorService.getResult(req.params.id);  

            if(!result)
                return res.status(400).json("Error while processing request. Please try again");
            
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({message: "An unexpected error has occurred"});
        }
    }
}