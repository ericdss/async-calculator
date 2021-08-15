export interface IPublisher{
    publishInQueue(message: any, queueName: string): Promise<boolean>
}