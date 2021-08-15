import mongoose from 'mongoose';
import { Status } from '../../../domain/enums/Status';

const calculatorSchema = new mongoose.Schema({
    // _id - auto generated
    number1: {
        type: String,
        required: true
    },
    number2: {
        type: String,
        required: true
    },
    status: {
        type: Status,
        required: true
    },
    result: {
        type: Number
    },
    creationDateTime: {
        type: Date,
        required: true
    },
    finishDateTime: {
        type: Date
    }
},
{
    collection: 'calculator'
});

interface CalculatorSchemaProps {
    id?: mongoose.Types.ObjectId,
    number1: number;
    number2: number;
    status: Status;
    creationDateTime: Date;
    finishDateTime?: Date;
    result?: number;
}

export default mongoose.model('Calculator', calculatorSchema);
export { CalculatorSchemaProps };