import mongoose from "mongoose";
import { Calculator } from "../../../domain/entities/Calculator";
import CalculatorModel, { CalculatorSchemaProps } from "../models/CalculatorModel";
import Mapper from "./Mapper";

class CalculatorMapper extends Mapper{
    static toSchema(calculator: Calculator): CalculatorSchemaProps | null {
        if(!calculator)
            return null;

        const calculatorSchema: CalculatorSchemaProps = {
            id: calculator.id ? mongoose.Types.ObjectId(calculator.id) : undefined,
            number1: calculator.number1,
            number2: calculator.number2,
            status: calculator.status,
            creationDateTime: calculator.creationDateTime,
            finishDateTime: calculator.finishDateTime,
            result: calculator.result
        };

        return calculatorSchema;
    }

    static toEntity(schema: any): Calculator | null {
        if(!schema)
            return null;
        
        const calculator = new Calculator({
            id: schema.id.toString(),
            number1: schema.number1,
            number2: schema.number2,
            status: schema.status,
            creationDateTime: schema.creationDateTime,
            finishDateTime: schema.finishDateTime,
            result: schema.result
        });

        return calculator;
    }

    static toListEntity(schemaList: any): Array<Calculator>{
        
        if(!schemaList || !schemaList.map || schemaList.length < 1)
            return [];
        
        const list = schemaList.map( (item: any): Calculator | null => { return this.toEntity(item); } );
        
        if(list == null)
            return [];
        
        return list;
    }
}

export default CalculatorMapper;