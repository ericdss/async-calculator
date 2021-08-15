import { Calculator } from "../../../domain/entities/Calculator";
import ICalculatorRepository from "../../../domain/interfaces/repositories/ICalculatorRepository";
import CalculatorMapper from "../mappers/CalculatorMapper";
import CalculatorModel from "../models/CalculatorModel";

export class CalculatorRepository implements ICalculatorRepository{
    
    async getById(id: string): Promise<Calculator | null> {
        const resultSchema = await CalculatorModel.findById(id);
        return CalculatorMapper.toEntity(resultSchema);
    }
    
    async save(calculator: Calculator): Promise<Calculator | null> {
        const schema = CalculatorMapper.toSchema(calculator);
        const resultSchema = await CalculatorModel.create(schema);
        return CalculatorMapper.toEntity(resultSchema);
    }
}