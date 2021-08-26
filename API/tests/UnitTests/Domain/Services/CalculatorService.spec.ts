import { CalculatorService } from '../../../../src/domain/services/Calculator/CalculatorService';
import calculatorRepositoryMock from './Mocks/CalculatorRepositoryMock';
import calculatorPublisherMock from './Mocks/CalculatorPublisherMock';
import { Status } from '../../../../src/domain/enums/Status';

const calculatorService = new CalculatorService(calculatorRepositoryMock, calculatorPublisherMock);

describe('Calculator_GetResult', () =>{

    it('Should return calculation status, with result when already processed', async () => {
        const result = await calculatorService.getResult("611027d8881b3837e81a1f82");

        expect(result).toEqual({
            id: "611027d8881b3837e81a1f82",
            number1: 5,
            number2: 5,
            status: Status.Processed,
            result: 10,
            creationDateTime: expect.any(Date),
            finishDateTime: expect.any(Date)
        });
    });

    it('Should return null when id not found', async () => {
        calculatorRepositoryMock.getById.mockResolvedValueOnce(null);

        const result = await calculatorService.getResult("611027d8881b3837e81a1f82");

        expect(calculatorRepositoryMock.getById).toHaveBeenCalledTimes(1);
        expect(result).toBeNull();
    });

});


describe('Calculator_CreateSum', () =>{

    it('Should create a new sum and enqueue in the message broker', async () => {
        const result = await calculatorService.createSum({
            number1: 5,
            number2: 5
        });
        
        expect(calculatorPublisherMock.publishInQueue).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
            id: "611027d8881b3837e81a1f82",
            number1: 5,
            number2: 5,
            status: Status.Pending,
            result: undefined,
            creationDateTime: expect.any(Date),
            finishDateTime: expect.any(Date)
        });
    });

    it('Should return null when message is not published', async () => {
        
        calculatorPublisherMock.publishInQueue.mockResolvedValueOnce(false);
        
        const result = await calculatorService.createSum({
            number1: 5,
            number2: 5
        });

        expect(calculatorPublisherMock.publishInQueue).toHaveBeenCalledTimes(1);
        expect(result).toBeNull();

    });

});