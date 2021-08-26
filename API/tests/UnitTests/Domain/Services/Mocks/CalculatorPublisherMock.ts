import { CalculatorPublisher } from '../../../../../src/infra/services/RabbitMQ/CalculatorPublisher';


const calculatorPublisherMock: jest.Mocked<CalculatorPublisher> = {
    publishInQueue: jest.fn()
}

calculatorPublisherMock.publishInQueue.mockResolvedValue(true);

export default calculatorPublisherMock;