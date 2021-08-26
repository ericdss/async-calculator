using RabbitMQ.Client;

namespace Worker.Application.interfaces
{
    public interface IConsumerService
    {
        void Run(string queueName, int workers);
    }
}
