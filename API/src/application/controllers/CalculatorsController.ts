import { Request, Response } from "express";
import BaseController from "./BaseController";
import ICalculatorService from "../../domain/interfaces/services/ICalculatorService";
import ICalculatorRepository from "../../domain/interfaces/repositories/ICalculatorRepository";

export class CalculatorController extends BaseController{
    private readonly _calculatorRepository: ICalculatorRepository;
    private readonly _calculatorService: ICalculatorService;

    constructor(calculatorService: ICalculatorService, calculatorRepository: ICalculatorRepository){
        super();
        this._calculatorService = calculatorService;
        this._calculatorRepository = calculatorRepository;
    }

    getResult = async (req: Request, res: Response): Promise<Response> =>{
        try {
            const id = await this.validateObjectId(req.params.id);

            if(!id)
                return res.status(400).json({message: "ID is in incorret format. Please try again"});
            
            if(!await this._calculatorRepository.getById(req.params.id))
                return res.status(404).json({message: "ID not found"});

            const result = await this._calculatorService.getResult(req.params.id);  

            if(!result)
                return res.status(400).json({message: "Error while processing request. Please try again"});
            
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({message: "An unexpected error has occurred"});
        }
    }

    sum = async (req: Request, res: Response): Promise<Response> =>{
        try {
            const result = await this._calculatorService.createSum(req.body);  

            if(!result)
                return res.status(400).json({message:"Error while processing request. Please try again"});
            
            return res.status(201).json(result);

        }
        catch (error) {
            return res.status(500).json({message: "An unexpected error has occurred"});
        }
    }
}