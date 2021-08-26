import { Status } from '../../../../../src/domain/enums/Status';
import { CalculatorRepository } from '../../../../../src/infra/mongoose/repositories/CalculatorRepository';

const calculatorRepositoryMock: jest.Mocked<CalculatorRepository> = {
    getById: jest.fn(),
    save: jest.fn()
}

const validProcessedCalculator = {
    id: "611027d8881b3837e81a1f82",
    number1: 5,
    number2: 5,
    status: Status.Processed,
    result: 10,
    creationDateTime: new Date(),
    finishDateTime: new Date()
};

const validPendingCalculator = {
    id: "611027d8881b3837e81a1f82",
    number1: 5,
    number2: 5,
    status: Status.Pending,
    result: undefined,
    creationDateTime: new Date(),
    finishDateTime: new Date()
};

calculatorRepositoryMock.getById.mockResolvedValue(validProcessedCalculator);
calculatorRepositoryMock.save.mockResolvedValue(validPendingCalculator);

export default calculatorRepositoryMock;