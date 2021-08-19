using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading;
using Worker.Application.Configurations;
using Worker.Application.DTO;
using Worker.Application.interfaces;
using Worker.Application.Services;
using Worker.Domain.Interfaces;
using Worker.Domain.Services;
using Worker.Infra.Data.Repositories;

// DI, Settings

namespace Worker.Application
{
    class Program
    {
        static void Main()
        {
            IConfiguration configuration = BuildConfig.AddBuildConfig(new ConfigurationBuilder());

            var host = Host.CreateDefaultBuilder()
                            .ConfigureServices((context, services) =>
                            {
                                services.ResolveDependencies(configuration);
                            })
                            .Build();   

            // Consumer
            var consumer = ActivatorUtilities.CreateInstance<ConsumerService>(host.Services);
            consumer.Run();

            //try
            //{
            //    var factory = new ConnectionFactory() { HostName = "localhost" };
            //    using (var connection = factory.CreateConnection())
            //    using (var channel = connection.CreateModel())
            //    {
            //        channel.QueueDeclarePassive(queue: "sum");
            //        channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);

            //        Console.WriteLine("Waiting for messages.");

            //        var consumer = new EventingBasicConsumer(channel);

            //        consumer.Received += async (sender, ea) =>
            //        {
            //            // Aguarda 2 seg
            //            Thread.Sleep(2000);

            //            var body = ea.Body.ToArray();
            //            var message = Encoding.UTF8.GetString(body);

            //            var entityId = JsonSerializer.Deserialize<EntityDTO>(message).Id;

            //            Console.WriteLine("Received {0}", entityId);

            //            ICalculatorService _calculatorService = new CalculatorService(new CalculatorRepository());
            //            await _calculatorService.CalculateSum(entityId);

            //            // Commita o item da fila (Ack)
            //            channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
            //        };

            //        channel.BasicConsume(queue: "sum",
            //                             autoAck: false,
            //                             consumer: consumer);

            //        Console.WriteLine("Press [enter] to exit.");
            //        Console.ReadLine();
            //    }
            //}
            //catch(Exception e)
            //{
            //    Console.WriteLine(e.Message);
            //}
        }

        
    }
}