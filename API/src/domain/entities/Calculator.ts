import Entity from "./Entity";
import { Status } from "../enums/Status";

interface CalculatorProps {
    id?: string;
    number1: number;
    number2: number;
    status: Status;
    result?: number;
    creationDateTime?: Date;
    finishDateTime?: Date;
}

export class Calculator extends Entity{
    id?: string;
    number1: number;
    number2: number;
    status: Status;
    result?: number;
    creationDateTime: Date;
    finishDateTime?: Date;

    constructor({id, number1, number2, status, result, creationDateTime, finishDateTime}: CalculatorProps){
        super();

        this.id = id;
        this.number1 = number1;
        this.number2 = number2;
        this.status = status;
        this.result = result;
        this.finishDateTime = finishDateTime;

        if(!creationDateTime)
            this.creationDateTime = new Date();
        else
            this.creationDateTime = creationDateTime;
    }

}