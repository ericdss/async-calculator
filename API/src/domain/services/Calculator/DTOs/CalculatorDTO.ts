import { Status } from "../../../enums/Status";

interface CalculatorDTO {
    id?: string;
    number1: number;
    number2: number;
    status: Status;
    result?: number | null;
    creationDateTime?: Date;
    finishDateTime?: Date | null;
}

export default CalculatorDTO;