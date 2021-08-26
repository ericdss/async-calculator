using Microsoft.Extensions.Configuration;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;
using System.Text.Json;
using System.Threading;
using Worker.Application.DTO;
using Worker.Application.interfaces;
using Worker.Domain.Interfaces;

namespace Worker.Application.Services
{
    public class ConsumerService : IConsumerService
    {
        private readonly ICalculatorService _calculatorService;
        private readonly IConfiguration _configuration;

        public ConsumerService(IConfiguration configuration, ICalculatorService calculatorService)
        {
            _configuration = configuration;
            _calculatorService = calculatorService;
        }

        public void Run(string queueName, int workers)
        {
            string connectionString = Environment.GetEnvironmentVariable("AMQP_CONNECTIONSTRING") ?? _configuration["AMQP:ConnectionString"];

            var factory = new ConnectionFactory(){ Uri = new Uri(connectionString) };

            try
            {
                using (var connection = factory.CreateConnection())
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclarePassive(queue: queueName);
                    channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);

                    Console.WriteLine("Waiting for messages.");

                    for (int i = 0; i < workers; i++)
                    {
                        BuildAndRunWorker(channel, $"Worker {i}", queueName);
                    }

                    Console.WriteLine("Press [enter] to exit.");
                    Console.ReadLine();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        //private IModel CreateChannel(IConnection connection, string queueName)
        //{
        //    var channel = connection.CreateModel();

        //    channel.QueueDeclarePassive(queue: queueName);

        //    return channel;
        //}

        private void BuildAndRunWorker(IModel channel, string name, string queueName)
        {
            var consumer = new EventingBasicConsumer(channel);

            consumer.Received += async (sender, ea) =>
            {
                try
                {
                    Thread.Sleep(2000);

                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);

                    var entityId = JsonSerializer.Deserialize<EntityDTO>(message).Id;

                    Console.WriteLine("{0} on channel {1} processing {2}: ", name, channel.ChannelNumber, entityId);

                    await _calculatorService.CalculateSum(entityId);

                    // Commita o item da fila (Ack)
                    channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);

                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            };

            channel.BasicConsume(queue: queueName,
                                 autoAck: false,
                                 consumer: consumer);
        }
    }
}
