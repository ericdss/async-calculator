import { Calculator } from "../../entities/Calculator";
import { Status } from "../../enums/Status";
import { IPublisher } from "../../interfaces/IPublisher";
import ICalculatorRepository from "../../interfaces/repositories/ICalculatorRepository";
import ICalculatorService from "../../interfaces/services/ICalculatorService";
import CalculatorDTO from "./DTOs/CalculatorDTO";
import NewSumDTO from "./DTOs/NewSumDTO";

export class CalculatorService implements ICalculatorService{

    private readonly _calculatorRepository: ICalculatorRepository;
    private readonly _calculatorPublisher: IPublisher;

    constructor(calculatorRepository: ICalculatorRepository, calculatorPublisher: IPublisher){
        this._calculatorRepository = calculatorRepository;
        this._calculatorPublisher = calculatorPublisher;
    }
    
    async getResult(id: string): Promise<CalculatorDTO | null> {
        try {
            const result = await this._calculatorRepository.getById(id);

            if(!result)
                return null;
            
            return {
                id: result.id,
                number1: result.number1,
                number2: result.number2,
                status: result.status,
                result: result.result,
                creationDateTime: result.creationDateTime,
                finishDateTime: result.finishDateTime
            };
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createSum(newSumDTO: NewSumDTO): Promise<CalculatorDTO | null> {
        try {
            const calculator = new Calculator({
                number1: newSumDTO.number1,
                number2: newSumDTO.number2,
                status: Status.Pending
            });

            const result = await this._calculatorRepository.save(calculator);

            if(!result)
                return null;

            // Enqueue
            const enqueue = await this._calculatorPublisher.publishInQueue({id: result.id}, "sum");

            if(!enqueue)
                return null;
            
            return {
                id: result.id,
                number1: result.number1,
                number2: result.number2,
                status: result.status,
                result: result.result,
                creationDateTime: result.creationDateTime,
                finishDateTime: result.finishDateTime
            };
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }
}